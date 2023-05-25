import {createSelector} from 'reselect';

const toastSelector = state => state.toast;

export const shouldShowToastSelector = createSelector(
  toastSelector,
  state => !!state.message,
);

export const currentToastSelector = createSelector(toastSelector, state => ({
  ...state,
}));
