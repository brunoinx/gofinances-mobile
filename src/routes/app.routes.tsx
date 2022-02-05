import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Dashboard } from '@/screens/Dashboard'
import { Register } from '@/screens/Register'
import { Platform } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, fonts } = useTheme()

  const icons = {
    Listagem: {
      name: 'format-list-bulleted',
    },
    Registro: {
      name: 'attach-money',
    },
    Resumo: {
      name: 'pie-chart',
    },
  }

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarIcon: ({ size, color }) => {
          const { name } = icons[route.name]
          return <MaterialIcons name={name} size={size} color={color} />
        },
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          borderTopColor: colors.text,
          height: RFPercentage(8.6),
        },
        tabBarLabelStyle: {
          fontSize: RFPercentage(2.1),
          fontFamily: fonts.text_400,
        },
      })}>
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Registro" component={Register} />
      <Screen name="Resumo" component={Register} />
    </Navigator>
  )
}
