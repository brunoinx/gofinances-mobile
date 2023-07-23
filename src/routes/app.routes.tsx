import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '@/screens/Dashboard';
import { Register } from '@/screens/Register';
import { Resume } from '@/screens/Resume';

import { RouteScreenProps } from '@/dtos/RootParamsListDTO';

type NameIconProps = {
  screen: 'Dashboard' | 'Register' | 'Resume';
  name: 'format-list-bulleted' | 'attach-money' | 'pie-chart';
};

const { Navigator, Screen } = createBottomTabNavigator<RouteScreenProps>();

export function AppRoutes() {
  const { colors, fonts } = useTheme();

  const icons: NameIconProps[] = [
    {
      screen: 'Dashboard',
      name: 'format-list-bulleted',
    },
    {
      screen: 'Register',
      name: 'attach-money',
    },
    {
      screen: 'Resume',
      name: 'pie-chart',
    },
  ];

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarIcon: ({ size, color }) => {
          const { name } = icons.find(({ screen }) => screen === route.name);

          return <MaterialIcons name={name} size={size} color={color} />;
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
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Listagem',
        }}
      />
      <Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: 'Registro',
        }}
      />
      <Screen
        name="Resume"
        component={Resume}
        options={{
          tabBarLabel: 'Resumo',
        }}
      />
    </Navigator>
  );
}
