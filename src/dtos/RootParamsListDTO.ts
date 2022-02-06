import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type RouteScreenProps = {
  Dashboard: undefined
  Register: undefined
  Resume: undefined
}

export type RootParamsListProps = BottomTabNavigationProp<RouteScreenProps>
