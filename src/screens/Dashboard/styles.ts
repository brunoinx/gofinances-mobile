import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.secondary};
`

export const Title = styled.Text`
  font-size: 22px;
  color: #333;
  font-weight: bold;
`
