import {createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {StartupTypes} from './startup.actions';
/** Default state */
const INITIAL_STATE = Immutable({
  showSplash: true,
});

/** Reducers */
const dismissSplashScreen = state => ({
  ...state,
  showSplash: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [StartupTypes.DISMISS_SPLASH_SCREEN]: dismissSplashScreen,
});
