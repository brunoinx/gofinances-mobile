import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  ${({ theme, isActive, type }) => css`
    width: 48%;

    border-width: ${isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${theme.colors.text};
    border-radius: 5px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;

    ${isActive &&
    type === 'up' &&
    css`
      background: ${theme.colors.success_light};
    `}

    ${isActive &&
    type === 'down' &&
    css`
      background: ${theme.colors.attention_light};
    `}
  `}
`;

export const Icon = styled(Feather)<IconProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${type === 'up' ? theme.colors.success : theme.colors.attention};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.text_400};
    font-size: ${RFValue(14)}px;
  `}
`;
