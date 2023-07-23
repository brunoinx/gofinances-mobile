import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

type InputProps = {
  isFocused: boolean;
};

export const InputContainer = styled(TextInput)<InputProps>`
  ${({ theme, isFocused }) => css`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    padding: 16px 18px;
    margin-bottom: 10px;

    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.text_400};
    color: ${theme.colors.title};
    border-width: 1.4px;
    background-color: ${theme.colors.shape};
    border-color: ${isFocused ? theme.colors.primary : 'transparent'};
  `}
`;
