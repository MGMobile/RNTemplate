import AsyncStorage from '@react-native-community/async-storage';

const APP_AUTH_TOKEN = 'APP_AUTH_TOKEN';

export const getPersistToken = () => AsyncStorage.getItem(APP_AUTH_TOKEN);

export const storePersistToken = token =>
  AsyncStorage.setItem(APP_AUTH_TOKEN, token);

export const resetPersistToken = () =>
  AsyncStorage.removeItem(APP_AUTH_TOKEN);
