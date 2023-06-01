import AsyncStorage from '@react-native-async-storage/async-storage';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: [],
    // Optionally, just specify the keys you DO want stored to persistence.
    // whitelist: [],
    // transforms: [immutablePersistenceTransform],
  },
};

export default REDUX_PERSIST;
