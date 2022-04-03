import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { useTheme } from 'styled-components'

import { Card } from '@/components/Card'
import { Moviment } from '@/components/Moviment'

import { formatToMoney } from '@/utils/formatToMoney'
import { TransactionDTO } from '@/dtos/transactionDTO'
import { getTransactions } from '@/storage/transactions'

import * as S from './styles'
import { format } from 'date-fns'

type HighLightProps = {
  amount: string
  lastTransaction: string
}
type HighLightData = {
  entries: HighLightProps
  expensives: HighLightProps
  total: HighLightProps
}

type TransactionProps = {
  id: string
} & TransactionDTO

export function Dashboard() {
  const theme = useTheme()

  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [highlightData, setHighlightData] = useState({} as HighLightData)

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, []), // eslint-disable-line
  )

  useEffect(() => {
    loadTransactions()
  }, []) // eslint-disable-line

  async function loadTransactions() {
    try {
      const transactions = await getTransactions()

      let entriesTotal = 0
      let expensiveTotal = 0

      for (const current of transactions) {
        if (current.transactionType === 'income') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          entriesTotal += current.amount
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          expensiveTotal += current.amount
        }
      }

      const lastTransactionsEntries = getIncomeTransactions(
        transactions,
        'income',
      )
      const lastTransactionsExpensive = getIncomeTransactions(
        transactions,
        'outcome',
      )
      const totalInterval = `01 a ${lastTransactionsExpensive}`

      const total = entriesTotal - expensiveTotal

      setTransactions(transactions)
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
      })
    } catch (error) {
      console.log(error)
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
    )

    return format(new Date(lastTransaction), 'dd/MM/yy')
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop>
          <S.UserInfo>
            <S.Photo source={{ uri: 'https://www.github.com/brunoinx.png' }} />

            <S.User>
              <S.UserGretting>Olá, </S.UserGretting>
              <S.UserName>Bruno Henrique</S.UserName>
            </S.User>
          </S.UserInfo>

          <S.ContainerLogout>
            <S.Logout onPress={() => console.log('oi')}>
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </S.Content>
    </S.Container>
  )
}
