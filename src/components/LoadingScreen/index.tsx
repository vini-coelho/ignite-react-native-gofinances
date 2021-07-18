import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

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
