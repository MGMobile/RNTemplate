import {createSelector} from 'reselect';

export const startupSelector = state => state.startup;

export const splashScreenVisibleSelector = createSelector(
  startupSelector,
  state => {
    return state.showSplash;
  },
);
