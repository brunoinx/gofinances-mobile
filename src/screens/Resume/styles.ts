import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
`;

export const Content = styled.ScrollView`
  width: 90%;
`;

export const ChartContent = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${RFPercentage(2.6)}px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.text_500};
  font-size: ${RFPercentage(2.7)}px;
`;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFPercentage(3.3)}px;
`;
