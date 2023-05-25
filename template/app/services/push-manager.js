import React, {useCallback, useEffect} from 'react';
import WonderPush from 'react-native-wonderpush';
import {useSelector} from 'react-redux';
import NetworkUtils from '@app/utils/checkNetInfo';
import NetInfo from '@react-native-community/netinfo';

const PushManager = ({children}) => {
  /* 
    ** TODO
  */
  const isLoggedIn = true;
  // const user = useSelector(userSelector);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(
      handleConnectionStatusChanged,
    );

    return () => {
      unsubscribeNetInfo();
    };
  }, [handleConnectionStatusChanged]);

  const handleConnectionStatusChanged = useCallback(
    state => {
      if (state.isConnected) {
        subscribeToNotif();
      } else {
        // eslint-disable-next-line react/react-in-jsx-scope
      }
    },
    [subscribeToNotif],
  );

  const subscribeToNotif = useCallback(async () => {
    try {
      const isConnected = await NetworkUtils.isNetworkAvailable();
      await WonderPush.subscribeToNotifications();

      // if (user.id && isConnected) {
      //   await WonderPush.setUserId(String(user.id));
      // }
    } catch (e) {
      console.log('error subscribeToNotif', e);
    }
  }, []);

  const unsubscribeFromNotifications = useCallback(async () => {
    try {
      await WonderPush.unsubscribeFromNotifications();
    } catch (e) {
      console.log('error unsubscribeFromNotifications', e);
    }
  }, []);

  useEffect(() => {
    WonderPush.setLogging(__DEV__);

    // if (isLoggedIn) {
    //   subscribeToNotif();
    // }

    // if (!isLoggedIn) {
    //   unsubscribeFromNotifications();
    // }
  }, []);

  return children;
};

export default PushManager;
