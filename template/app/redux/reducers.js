import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import configureStore from '@app/redux/create-store';
import rootSaga from '@app/redux/sagas';
import ReduxPersist from '@app/config/redux-persist';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  asyncHandler: require('@app/redux/async-handler/async-handler.reducer')
    .reducer,
  toast: require('@app/redux/toast/toast.reducer').reducer,
  startup: require('@app/redux/startup/startup.reducer').reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(reducers);

      const newYieldedSagas = require('./sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
