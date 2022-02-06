import styled, { css } from 'styled-components/native'
import {
  BorderlessButton,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { RFPercentage as RFP } from 'react-native-responsive-fontsize'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFP(40)}px;
    background-color: ${theme.colors.primary};

    padding-top: ${getStatusBarHeight() + RFP(3)}px;
    position: relative;
  `}
`

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 ${RFP(4)}px;
  margin-bottom: ${RFP(3)}px;
`

export const UserInfo = styled.View`
  flex-direction: row;
`

export const Photo = styled.Image`
  width: ${RFP(7)}px;
  height: ${RFP(7)}px;
  border-radius: ${RFP(1)}px;
`

export const User = styled.View`
  margin-left: ${RFP(2)}px;
`

export const UserGretting = styled.Text`
  font-size: ${RFP(2.3)}px;
  font-family: ${({ theme }) => theme.fonts.text_400};
  color: ${({ theme }) => theme.colors.background};
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFP(2.3)}px;
  font-family: ${({ theme }) => theme.fonts.text_700};
`

export const ContainerLogout = styled(GestureHandlerRootView)``

export const Logout = styled(BorderlessButton)``

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFP(3.5)}px;
`

export const ListCards = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: RFP(2.4),
  },
})`
  position: absolute;
  bottom: ${RFP(-6)}px;
`

export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFP(3)}px;
`

export const Title = styled.Text`
  margin-top: ${RFP(8)}px;
  margin-bottom: ${RFP(1.5)}px;
  font-size: ${RFP(2.5)}px;
  font-family: ${({ theme }) => theme.fonts.text_400};
`
