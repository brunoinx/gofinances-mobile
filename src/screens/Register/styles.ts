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

export const Header = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    width: 100%;
    height: ${RFPercentage(15)}px;
    padding-top: ${getStatusBarHeight() + RFPercentage(2)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFPercentage(3)}px;
  `}
`

export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_400};
    font-size: ${RFPercentage(2.6)}px;
    color: ${theme.colors.background};
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
