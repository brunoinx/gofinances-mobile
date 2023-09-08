import styled, { css } from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

type ButtonTypeProps = {
  type: 'confirm' | 'cancel';
};

export const Overlay = styled.TouchableOpacity`
  ${({ theme }) => css`
    flex: 1;
    align-items: center;
    justify-content: center;

    z-index: ${theme.layers.overlay};
    background-color: ${theme.colors.overlay};
  `};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    width: ${width * 0.8}px;
    margin: 0 auto;
    border-radius: 8px;
    padding: 32px 14px 16px;
    z-index: ${theme.layers.modal};
    background-color: ${theme.colors.background};

    align-items: center;
    justify-content: center;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    font-size: ${RFValue(16)}px;
    font-family: ${theme.fonts.text_500};
    color: ${theme.colors.title};
  `};
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    font-size: ${RFValue(13)}px;
    font-family: ${theme.fonts.text_400};
    color: ${theme.colors.text};
  `};
`;

export const Footer = styled.View`
  gap: 12px;
  margin-top: 36px;
  align-self: flex-end;
  flex-direction: row;
`;

export const Button = styled(TouchableOpacity)<ButtonTypeProps>`
  padding: 8px 12px;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
  background-color: ${({ type, theme }) =>
    type === 'confirm' ? theme.colors.success : theme.colors.attention};
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_500};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.shape};
  `};
`;
