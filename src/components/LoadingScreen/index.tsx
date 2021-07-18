import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { LoadingContaier } from './styles';

export function LoadingScreen() {
  const theme = useTheme();

  return (
    <LoadingContaier>
      <ActivityIndicator
        color={theme.colors.primary}
        size='large'
      />
    </LoadingContaier>
  );
}
