import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage as RFP } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down' | 'dollar';
}

export const Container = styled.View<TypeProps>`
  ${({ theme, type }) => css`
    background-color: ${type === 'dollar'
      ? theme.colors.secondary
      : theme.colors.shape};

    width: ${Dimensions.get('window').width - RFP(10)}px;
    border-radius: ${RFP(0.7)}px;

    padding: ${RFP(3)}px ${RFP(3)}px ${RFP(1.8)}px;
    margin: ${RFP(1)}px;

    box-shadow: 2px 1px 2px ${theme.colors.shadow};
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.text_400};
    font-size: ${RFP(2)}px;
    text-align: center;

    color: ${type === 'dollar' ? theme.colors.shape : '#000'};
  `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.text_500};
  font-size: ${RFP(4)}px;

  margin-top: ${RFP(3)}px;

  color: ${({ theme, type }) =>
    type === 'dollar' ? theme.colors.shape : '#000'};
`;

export const LastMoviment = styled.Text<TypeProps>`
  font-size: ${RFP(1.8)}px;
  margin-top: ${RFP(2)}px;
  margin-bottom: ${RFP(2)}px;

  color: ${({ theme, type }) =>
    type === 'dollar' ? theme.colors.shape : theme.colors.text};
`;

export const Icon = styled(Feather)<TypeProps>`
  ${({ theme, type }) => css`
    font-size: ${RFP(4.5)}px;

    ${
      type === 'up' &&
      css`
        color: ${theme.colors.success};
      `
    }

    ${
      type === 'down' &&
      css`
        color: ${theme.colors.attention};
      `
    }

    ${
      type === 'dollar' &&
      css`
        color: ${theme.colors.shape};
      `
    }
    }
  `}
`;
