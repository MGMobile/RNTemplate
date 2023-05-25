import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '@/app/screens/home';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
      }}>
      <Stack.Screen
        options={{headerShown: false, drawerLabel: 'Mentions légales'}}
        name={SCREEN_NAMES.HOME}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
