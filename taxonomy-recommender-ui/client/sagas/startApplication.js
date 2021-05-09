import { call, put, fork, take } from 'redux-saga/effects';
import { callGet } from '../services/api';
import * as actions from '../constants/actions';
// import * as query from '../constants/query';
export default function* watchStartApplication() {
  yield take( actions.START_APPLICATION );
  yield fork( connect );
}

export function* connect() {
  const response =   [];
  yield put( { type: actions.CONFIG_LOADED, config: response, selectedValues: [] } );

}
