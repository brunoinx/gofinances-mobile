import styled, { css } from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

type ColorProps = {
  color: string
}

export const Container = styled.View<ColorProps>`
  ${({ theme, color }) => css`
    width: 100%;

    background-color: ${theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;

    padding: ${RFPercentage(2)}px;

    border-radius: ${RFPercentage(0.7)}px;
    border-left-width: ${RFPercentage(0.7)}px;
    border-left-color: ${color};

    margin-bottom: ${RFPercentage(2)}px;
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_400};
    font-size: ${RFPercentage(2.1)}px;
  `}
`

export const Amount = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_500};
    font-size: ${RFPercentage(2.1)}px;
  `}
`
