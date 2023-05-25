import {takeLatest, all, call, put, select} from 'redux-saga/effects';
import StartupActions, {StartupTypes} from '@app/redux/startup/startup.actions';
import {handleAsyncStatus} from '@app/redux/async-handler/async-handler.saga';
import {AsyncHandlerEventActionNames} from '@app/redux/async-handler/async-handler.types';
import {getPersistToken} from '@app/services/store-token';

export function* startup(_, api) {
  /*
    ** TODO: **
    ** Logique au lancement de l'app **
  */
}

export default function* startupSaga(api) {
  yield all([
    takeLatest(
      StartupTypes.STARTUP,
      handleAsyncStatus(startup, AsyncHandlerEventActionNames.STARTUP, api),
    ),
  ]);
}
