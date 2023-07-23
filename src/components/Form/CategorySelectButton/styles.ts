import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  ${({ theme }) => css`
    width: 100%;
    height: 54px;

    padding: 0 16px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: ${theme.colors.shape};

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_400};
    font-size: ${RFPercentage(2)}px;
    color: ${theme.colors.title};
  `}
`;

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${RFPercentage(2.8)}px;
  `}
`;
