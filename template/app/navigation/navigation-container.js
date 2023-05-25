import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import MainStack from '@app/navigation/stacks/mainStack';
import {navigationRef} from '@app/services/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {View} from 'react-native';
import {StatusBar, Platform, Animated} from 'react-native';
import styled from 'styled-components/native';
import theme from '@app/theme';

const Stack = createStackNavigator();

const SAnimatedView = styled(Animated.View).attrs(({style}) => ({
  style,
}))`
  flex: 1;
`;

const SBlurView = styled.View`
  flex: 1;
  background-color: rgba(61, 86, 248, 0.7);
`;

const MyTheme = {
  colors: {
    primary: theme.colors.fiord,
  },
};

const Navigation = ({linking}) => {
  const isLogged = true;
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef} linking={linking}>
      <Stack.Navigator
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
          headerTransparent: true,
          headerBackTitleVisible: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true,
          gestureEnabled: false,
          headerStatusBarHeight: StatusBar.currentHeight,
          cardOverlay: ({style}) => {
            return (
              <SAnimatedView
                style={
                  ([style],
                  {
                    opacity: 1,
                    backgroundColor: 'transparent',
                  })
                }>
              </SAnimatedView>
            );
          },
        }}>
        {isLogged ? (
          <Stack.Screen
            name={SCREEN_NAMES.MAINSTACK}
            component={MainStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={SCREEN_NAMES.AUTHSTACK}
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigation);
