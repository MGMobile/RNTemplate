import ReduxPersist from '@app/config/redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore} from 'redux-persist';
// import StartupActions from '@app/redux/startup/startup.actions';
import DebugConfig from '@app/config/debug-config';

const updateReducers = store => {
  const reducerVersion = ReduxPersist.reducerVersion;
  // const startup = () => store.dispatch(StartupActions.startup());

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    // eslint-disable-next-line prettier/prettier
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
        if (DebugConfig.useReactotron) {
          console.tron.display({
            name: 'PURGE',
            value: {
              'Old Version:': localVersion,
              'New Version:': reducerVersion,
            },
            preview: 'Reducer Version Change Detected',
            important: true,
          });
        }
        // Purge store
        persistStore(store, null).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, null);
      }
    })
    .catch(() => {
      persistStore(store, null);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default {updateReducers};
