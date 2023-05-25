import {createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {AsyncHandlerTypes} from '@app/redux/async-handler/async-handler.actions';

/** Default state */
const INITIAL_STATE = Immutable({});

/** Reducers */
const addError = (state, {asyncEventName, error}) => ({
  ...state,
  [asyncEventName]: {
    ...state[asyncEventName],
    ...error,
  },
});

const removeError = (state, {asyncEventName}) => ({
  ...state,
  [asyncEventName]: {
    ...state[asyncEventName],
    error: undefined,
  },
});

const showLoader = (state, {asyncEventName}) => ({
  ...state,
  [asyncEventName]: {
    ...state[asyncEventName],
    isLoading: true,
  },
});

const hideLoader = (state, {asyncEventName}) => ({
  ...state,
  [asyncEventName]: {
    ...state[asyncEventName],
    isLoading: undefined,
  },
});

const showToast = (state, {asyncEventName}) => ({
  ...state,
  [asyncEventName]: {
    ...state[asyncEventName],
    showToast: true,
  },
});

const hideToast = (state, {asyncEventName}) => ({
  ...state,
  [asyncEventName]: {
    ...state[asyncEventName],
    showToast: undefined,
  },
});

const resetLoader = state => INITIAL_STATE;

const hideToasts = state => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [AsyncHandlerTypes.ADD_ERROR]: addError,
  [AsyncHandlerTypes.REMOVE_ERROR]: removeError,
  [AsyncHandlerTypes.SHOW_LOADER]: showLoader,
  [AsyncHandlerTypes.HIDE_LOADER]: hideLoader,
  [AsyncHandlerTypes.SHOW_TOAST]: showToast,
  [AsyncHandlerTypes.HIDE_TOAST]: hideToast,
  [AsyncHandlerTypes.RESET_LOADER]: resetLoader,
});
