import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

type Props = {
  error: boolean;
};

export const InputContainer = styled.TextInput<Props>`
  ${({ theme, error }) => css`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    padding: 16px 18px;
    margin-bottom: 10px;

    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.text_400};
    color: ${theme.colors.title};
    border-width: 1px;
    background-color: ${theme.colors.shape};
    border-color: ${error ? theme.colors.attention : 'transparent'};
  `}
`;

export const ErrorText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.attention};
    font-family: ${theme.fonts.text_500};
    margin-top: -6px;
    margin-left: 8px;
  `}
`;
