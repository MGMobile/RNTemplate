import {createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  showToast: ['title', 'message', 'options'],
  hideToast: null,
});

export const ToastTypes = Types;
export default Creators;