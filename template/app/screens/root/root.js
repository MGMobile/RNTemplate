/* eslint-disable no-new */
import Loader from '@app/components/ui/loader';
import Toast from '@app/components/ui/toast';
import Navigation from '@app/navigation';
import React, {useEffect} from 'react';
import {Linking, StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import {useCallback} from 'react';
import StartupActions from '@app/redux/startup/startup.actions';
import WonderPush from 'react-native-wonderpush';
import PushManager from '@app/services/push-manager';

const Root = ({shouldShowToast, toast, isLoading, navigation}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const linking = useCallback(
    {
      prefixes: ['match://'],
      config: {
        screens: {
          Main: {
            initialRouteName: SCREEN_NAMES.DRAWER,
            screens: {
              [SCREEN_NAMES.HOME]: 'home',
            },
          },
        },
      },
      async getInitialURL() {
        // First, you may want to do the default deep link handling
        // Check if app was opened from a deep link
        const url =
          // eslint-disable-next-line prettier/prettier
          (await Linking.getInitialURL()) || (await WonderPush.getInitialURL());

        if (!isLoggedIn) {
          return undefined;
        }
        if (url != null) {
          return url;
        }
      },
      subscribe(listener) {
        // First, you may want to do the default deep link handling
        const onReceiveURL = ({url}) => {
          return listener(url);
        };

        // Listen to incoming links from deep linking
        Linking.addEventListener('url', onReceiveURL);
        return () => {
          // Clean up the event listeners
          Linking.removeEventListener('url', onReceiveURL);
        };
      },
    },
    [],
  );

  return (
    <PushManager>
      <View flex={1}>
        <StatusBar barStyle="dark-content" />
        <Navigation linking={linking} />
        {!!shouldShowToast && <Toast {...toast} />}
        {isLoading && <Loader />}
      </View>
    </PushManager>
  );
};

export default Root;
