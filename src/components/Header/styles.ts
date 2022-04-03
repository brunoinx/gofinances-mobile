import styled, { css } from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFPercentage } from 'react-native-responsive-fontsize'

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
