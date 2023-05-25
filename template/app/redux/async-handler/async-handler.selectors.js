import {createSelector} from 'reselect';

const asyncHandlerSelector = state => state.asyncHandler;

export const isLoadingSelector =
  (asyncEventName = undefined) =>
  state =>
    (asyncHandlerSelector(state)[asyncEventName] &&
      !!asyncHandlerSelector(state)[asyncEventName].isLoading) ||
    false;

export const errorSelector = asyncEventName => state =>
  asyncHandlerSelector(state)[asyncEventName] &&
  asyncHandlerSelector(state)[asyncEventName].error;

export const shouldShowLoaderSelector = createSelector(
  asyncHandlerSelector,
  state => Object.values(state).some(value => !!value.isLoading),
);
