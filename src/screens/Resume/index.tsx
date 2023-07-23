import React, { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { HistoryCard } from '@/components/HistoryCard';

import { categories } from '@/mocks/categories';
import { getTransactions } from '@/storage/transactions';
import { formatToMoney } from '@/utils/formatToMoney';

import * as S from './styles';

type CategoryData = {
  key: string;
  name: string;
  color: string;
  amountFormatted: string;
  percent: number;
  percentFormatted: string;
};

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  useEffect(() => {
    async function loadData() {
      const transactions = await getTransactions();

      const expensives = transactions.filter(
        expensive => expensive.transactionType === 'outcome',
      );

      const total = expensives.reduce(
        (acc, current) => acc + current.amount,
        0,
      );

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
            amountFormatted,
            percent: Number(percent),
            percentFormatted: `${percent}%`,
          });
        }
      });

      setTotalByCategories(totalByCategory);
    }

    loadData();
  }, []);

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <S.Content>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.amountFormatted}
            color={item.color}
          />
        ))}
      </S.Content>
    </S.Container>
  );
}
