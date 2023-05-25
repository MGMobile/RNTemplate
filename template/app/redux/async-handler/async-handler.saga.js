import {fork, all, call, put, delay, cancel} from 'redux-saga/effects';
import AsyncHandlerActions from '@app/redux/async-handler/async-handler.actions';
import ToastActions from '@app/redux/toast/toast.actions';
import {ToastMessageTypes} from '@app/redux/toast/toast.types';

export function* addDelayToLoaderSaga(
  asyncEventName,
  minimalRequestDelayForLoader,
) {
  if (minimalRequestDelayForLoader > -1) {
    if (minimalRequestDelayForLoader > 0) {
      yield delay(minimalRequestDelayForLoader);
    }
    yield put(AsyncHandlerActions.showLoader(asyncEventName));
  }
}

/**
 *
 * @param {*} saga saga to use for the middleware
 * @param {*} asyncEventName name of the async action to use for the middleware
 * @param {*} sagaParams extra saga params to pass
 * @param {*} minimalRequestDelayForLoader show loader only if request execution is longer than `minimalRequestDelayForLoader`, default 1s, 0 to show loader immediatly, -1 to hide loader
 */
export const handleAsyncStatus = (
  saga,
  asyncEventName,
  sagaParams = {},
  minimalRequestDelayForLoader = 100,
) =>
  function* (...args) {
    const extendedParams = sagaParams ? [...args, sagaParams] : args;
    const showLoader =
      args[0].showLoader === undefined ? false : args[0].showLoader;
    const task = yield fork(
      addDelayToLoaderSaga,
      asyncEventName,
      showLoader ? minimalRequestDelayForLoader : -1,
    );
    try {
      const [result] = yield all([call(saga, ...extendedParams)]);
      yield put(AsyncHandlerActions.removeError(asyncEventName));
      return result;
    } catch (error) {
      yield put(AsyncHandlerActions.addError(asyncEventName, error));
    } finally {
      yield cancel(task);
      yield put(AsyncHandlerActions.hideLoader(asyncEventName));
    }
  };
