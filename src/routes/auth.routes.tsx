import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen
        name='Listagem'
        component={SignIn}
        options={{
          headerShown: false
        }}
      />
    </Navigator>
  );
}
