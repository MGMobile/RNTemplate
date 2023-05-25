import {fork, all} from 'redux-saga/effects';
// import API from '@app/services/api';
import API from '@app/services/api';
import startupSaga from './startup/startup.saga';

/* ------------- API ------------- */

const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([fork(startupSaga, api)]);
}
