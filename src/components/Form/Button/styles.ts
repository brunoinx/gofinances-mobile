import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.secondary};
    padding: 16px;
    border-radius: 5px;
    align-items: center;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_500};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.shape};
  `}
`;
