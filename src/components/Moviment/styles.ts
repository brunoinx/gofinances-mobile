import styled, { css } from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

type TransactionProps = {
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding: ${RFValue(10)}px 24px;
    border-radius: 8px;
    margin-bottom: 16px;

    background-color: ${theme.colors.shape};
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.text_400};
    color: ${theme.colors.title};
  `}
`

export const Amount = styled.Text<TransactionProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(19)}px;
    font-family: ${theme.fonts.text_400};
    color: ${type === 'positive'
      ? theme.colors.success
      : theme.colors.attention};
  `}
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFPercentage(2.6)}px;
`

export const Icon = styled(Feather).attrs({
  size: RFValue(19),
})`
  color: ${({ theme }) => theme.colors.text};
  margin-right: 17px;
`

export const CategoryeWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

export const FooterText = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(12)}px;
    font-family: ${theme.fonts.text_400};
    color: ${theme.colors.text};
  `}
`
