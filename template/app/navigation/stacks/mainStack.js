import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '@app/screens/home';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
      }}>
      <Stack.Screen
        options={({navigation, props}) => ({
          headerLeft: () => null,
          headerRight: () => null,
        })}
        name={SCREEN_NAMES.HOME}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
