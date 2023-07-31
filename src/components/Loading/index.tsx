import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export function Loading() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
