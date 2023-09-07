import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_400};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text};
  `};
`;
