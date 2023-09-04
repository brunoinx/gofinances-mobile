import React, { Suspense, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { HistoryCard } from '@/components/HistoryCard';

import { categories } from '@/mocks/categories';
import { getTransactions } from '@/storage/transactions';
import { formatToMoney } from '@/utils/formatToMoney';

import * as S from './styles';

type CategoryData = {
  key: string;
  name: string;
  color: string;
  amount: number;
  amountFormatted: string;
  percent: number;
  percentFormatted: string;
};

export function Resume() {
  const { colors } = useTheme();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]),
  );

  async function loadData() {
    const transactions = await getTransactions();

    if (!transactions) {
      return;
    }

    const expensives = transactions.filter(
      expensive =>
        expensive.transactionType === 'outcome' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const total = expensives.reduce((acc, current) => acc + current.amount, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const percent = ((categorySum / total) * 100).toFixed(0);
        const amountFormatted = formatToMoney(categorySum);

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          amount: categorySum,
          amountFormatted,
          percent: Number(percent),
          percentFormatted: `${percent}%`,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  function handleChangeDate(action: 'prev' | 'next') {
    if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1));
    } else {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  }

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <Suspense fallback={<Loading />}>
        <S.Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: useBottomTabBarHeight() + 60,
          }}>
          <S.MonthSelect>
            <S.MonthSelectButton onPress={() => handleChangeDate('prev')}>
              <S.MonthSelectIcon name="chevron-left" />
            </S.MonthSelectButton>

            <S.Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </S.Month>

            <S.MonthSelectButton onPress={() => handleChangeDate('next')}>
              <S.MonthSelectIcon name="chevron-right" />
            </S.MonthSelectButton>
          </S.MonthSelect>

          <S.ChartContent>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: colors.shape,
                },
              }}
              labelRadius={68}
              x="percentFormatted"
              y="amount"
              height={340}
            />
          </S.ChartContent>

          {totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.amountFormatted}
              color={item.color}
            />
          ))}
        </S.Content>
      </Suspense>
    </S.Container>
  );
}
