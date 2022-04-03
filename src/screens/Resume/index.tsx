import React, { useEffect } from 'react'
import { useTheme } from 'styled-components'

import { Header } from '@/components/Header'

import * as S from './styles'
import { HistoryCard } from '@/components/HistoryCard'
import { getTransactions } from '@/storage/transactions'

export function Resume() {
  const theme = useTheme()

  useEffect(() => {
    async function loadData() {
      const transactions = await getTransactions()

      console.log(transactions)
    }

    loadData()
  }, [])

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <HistoryCard
        title="Compras"
        amount="R$ 1.000,00"
        color={theme.colors.primary}
      />
    </S.Container>
  )
}
