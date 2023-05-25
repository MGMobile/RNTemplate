import {call} from 'redux-saga/effects';

/**
 * Returns a saga which upon resolve will trigger the `resolve` or `reject` clause
 * of a _IPromisifedAction_
 *
 * * ⚠️ This saga is only usable within a `takeEvery` or `takeLatest` clause (which pass the action)
 * * ⚠️ To be correctly used, this saga needs to be wrapped in a try/catch block or used in the handleAsyncStatus saga
 *
 * @param saga a saga which can only take an action as an argument
 */
export function sagaPromiseDecorator(saga) {
  return function* (action, ...args) {
    try {
      const result = yield call(saga, action, ...args);
      if (action.resolve) {
        action.resolve(result);
      }
    } catch (error) {
      if (action.reject) {
        action.reject(error);
      }
      throw error;
    }
  };
}
