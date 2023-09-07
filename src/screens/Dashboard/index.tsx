import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Modal } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { Card } from '@/components/Card';
import { Moviment } from '@/components/Moviment';
import { EmptyMessage } from '@/components/EmptyMessage';
import * as AlertDialog from '@/components/AlertDialog';

import { useAuth } from '@/hooks/useAuth';
import { maskCurrency } from '@/utils/maskCurrency';
import { formatToMoney } from '@/utils/formatToMoney';
import { TransactionDTO } from '@/dtos/transactionDTO';
import { getTransactions } from '@/storage/transactions';

import ProfileDefaultImg from '@/assets/images/default-profile.jpg';

import * as S from './styles';

type HighLightProps = {
  amount: string;
  lastTransaction: string;
};
type HighLightData = {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps;
};

type TransactionProps = {
  id: string;
} & TransactionDTO;

export function Dashboard() {
  const theme = useTheme();
  const { userData, signOut } = useAuth();

  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as HighLightData);
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  async function loadTransactions() {
    try {
      const transactions = await getTransactions();

      if (!transactions) {
        return setHighlightData({
          total: {
            amount: maskCurrency('0'),
            lastTransaction: 'nenhuma movimentação',
          },
          expensives: {
            amount: maskCurrency('0'),
            lastTransaction: 'nenhuma movimentação',
          },
          entries: {
            amount: maskCurrency('0'),
            lastTransaction: 'nenhuma movimentação',
          },
        });
      }

      const hasTransactionTypeIncome = transactions.some(
        item => item.transactionType === 'income',
      );
      const hasTransactionTypeOutcome = transactions.some(
        item => item.transactionType === 'outcome',
      );

      let entriesTotal = 0;
      let expensiveTotal = 0;

      for (const current of transactions) {
        if (current.transactionType === 'income') {
          entriesTotal += current.amount;
        } else {
          expensiveTotal += current.amount;
        }
      }

      let lastTransactionsEntries: string;
      let lastTransactionsExpensive: string;

      if (hasTransactionTypeIncome) {
        lastTransactionsEntries = getIncomeTransactions(transactions, 'income');
      }

      if (hasTransactionTypeOutcome) {
        lastTransactionsExpensive = getIncomeTransactions(
          transactions,
          'outcome',
        );
      }

      const totalInterval = `01 a ${lastTransactionsExpensive}`;

      const total = entriesTotal - expensiveTotal;

      setTransactions(transactions);

      setHighlightData({
        entries: {
          amount: formatToMoney(entriesTotal),
          lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
        },
        expensives: {
          amount: formatToMoney(expensiveTotal),
          lastTransaction: `Última despesa dia ${lastTransactionsExpensive}`,
        },
        total: {
          amount: formatToMoney(total),
          lastTransaction: totalInterval,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function getIncomeTransactions(
    transactions: TransactionProps[],
    type: 'income' | 'outcome',
  ) {
    // eslint-disable-next-line prefer-spread
    const lastTransaction = Math.max.apply(
      Math,
      transactions
        .filter(item => item.transactionType === type)
        .map(item => new Date(item.date).getTime()),
    );

    return format(new Date(lastTransaction), 'dd/MM/yy');
  }

  function handleToggleAlertDialog() {
    setAlertIsVisible(prev => !prev);
  }

  return (
    <S.Container>
      <Modal
        transparent
        animationType="fade"
        visible={alertIsVisible}
        onRequestClose={handleToggleAlertDialog}>
        <AlertDialog.Overlay onRequestClose={handleToggleAlertDialog}>
          <AlertDialog.Content
            title="Sair do app"
            description="Deseja realmente sair do app>">
            <AlertDialog.Button
              type="cancel"
              onPress={handleToggleAlertDialog}
            />

            <AlertDialog.Button type="confirm" onPress={signOut} />
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </Modal>

      <S.Header>
        <S.HeaderTop>
          <S.UserInfo>
            <S.Photo
              source={
                userData.picture ? { uri: userData.picture } : ProfileDefaultImg
              }
            />

            <S.User>
              <S.UserGreeting>Olá, </S.UserGreeting>
              <S.UserName>{userData.name}</S.UserName>
            </S.User>
          </S.UserInfo>

          <S.ContainerLogout>
            <S.Logout onPress={handleToggleAlertDialog}>
              <S.Icon name="power" size={24} color={theme.colors.attention} />
            </S.Logout>
          </S.ContainerLogout>
        </S.HeaderTop>

        <S.ListCards>
          <Card
            title="Entradas"
            amount={highlightData?.entries?.amount}
            lastMoviment={highlightData?.entries?.lastTransaction}
            type="up"
          />

          <Card
            title="Saídas"
            amount={highlightData?.expensives?.amount}
            lastMoviment={highlightData?.expensives?.lastTransaction}
            type="down"
          />

          <Card
            title="Total"
            amount={highlightData?.total?.amount}
            lastMoviment={highlightData?.total?.lastTransaction}
            type="dollar"
          />
        </S.ListCards>
      </S.Header>

      <S.Content>
        <S.Title>Transações</S.Title>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Moviment data={item} />}
          ListEmptyComponent={<EmptyMessage />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ height: '100%', paddingBottom: 20 }}
        />
      </S.Content>
    </S.Container>
  );
}
