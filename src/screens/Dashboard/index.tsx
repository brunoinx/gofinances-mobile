import React from 'react'
import { useTheme } from 'styled-components'

import * as S from './styles'

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
      </S.Header>
    </S.Container>
  )
}
