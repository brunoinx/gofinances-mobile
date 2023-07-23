import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const ErrorText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.attention};
    font-family: ${theme.fonts.text_400};
    margin-top: -6px;
    margin-left: 8px;
  `}
`;
