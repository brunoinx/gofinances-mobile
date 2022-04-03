import styled, { css } from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import { Feather } from '@expo/vector-icons'

export const Container = styled(GestureHandlerRootView)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
    align-items: center;
  `}
`

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: ${RFPercentage(3)}px;
  justify-content: space-between;
`

export const TransactionsType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`
