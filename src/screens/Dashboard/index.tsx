import React from 'react'
import { FlatList, Text } from 'react-native'
import { useTheme } from 'styled-components'

import { Card } from '@/components/Card'

import * as S from './styles'
import { Moviment } from '@/components/Moviment'

export function Dashboard() {
  const theme = useTheme()

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

          <S.Logout onPress={() => ''}>
            <S.Icon name="power" size={24} color={theme.colors.attention} />
          </S.Logout>
        </S.HeaderTop>

        <S.ListCards>
          <Card
            title="Entradas"
            amount="R$ 1.000,00"
            lastMoviment="Última entrada dia 13 de abril"
            type="up"
          />

          <Card
            title="Saídas"
            amount="R$ 1.000,00"
            lastMoviment="Última entrada dia 13 de abril"
            type="down"
          />

          <Card
            title="Total"
            amount="R$ 1.000,00"
            lastMoviment="Última entrada dia 13 de abril"
            type="dollar"
          />
        </S.ListCards>
      </S.Header>

      <S.Content>
        <S.Title>Transações</S.Title>

        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={item => String(item)}
          renderItem={() => (
            <Moviment
              data={{
                title: 'Conta de Luz',
                amount: 'R$ 1.000,00',
                type: 'positive',
                date: '13/04/2020',
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </S.Content>
    </S.Container>
  )
}
