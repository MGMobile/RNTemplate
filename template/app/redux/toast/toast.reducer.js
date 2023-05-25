import {createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {ToastTypes} from '@app/redux/toast/toast.actions';

/** Default state */
const INITIAL_STATE = Immutable({
  message: undefined,
  options: undefined,
});

/** Reducers */
const show = (_, {title, message, options}) => {
  return {
    title,
    message,
    options,
  };
};

const hide = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [ToastTypes.SHOW_TOAST]: show,
  [ToastTypes.HIDE_TOAST]: hide,
});
