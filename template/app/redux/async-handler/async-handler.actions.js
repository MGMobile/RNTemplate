import {createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addError: ['asyncEventName', 'error'],
  removeError: ['asyncEventName'],
  showLoader: ['asyncEventName'],
  hideLoader: ['asyncEventName'],
  showToast: ['asyncEventName'],
  hideToast: ['asyncEventName'],
  resetLoader: null,
});

export const AsyncHandlerTypes = Types;
export default Creators;
