import { call, put, fork, take,select } from 'redux-saga/effects';
import { callPost, callGet } from '../services/api';
import * as actions from '../constants/actions';
import {config, selectedValues} from './selectors';
import _ from 'lodash';
import { delay } from 'redux-saga';
export default function* watchSearchConditionRequest() {
  let searchAction;
  while ((searchAction = yield take(actions.SEARCH_CONDITION_TRIGGER)) !== null) {
    yield fork(searchConditions, searchAction);
  }
}



export  function* watchRunExperimentsRequest() {
  let searchAction;
  while ((searchAction = yield take(actions.RUN_EXPERIMENTS)) !== null) {
    yield fork(runexperiments, searchAction);
  }
}
export function* runexperiments(searchAction) {
  console.log("searchAction", searchAction.payload.skillname.value)
  try {
    const response = yield call(callPost, '/getbloomverbs/'+searchAction.payload.skillname.value);
    
    console.log("response", response);
    // const values = _.cloneDeep(yield select(selectedValues));
    // values.push(...searchAction.payload.searchValue)
    yield put({
      type: actions.EXPERIMENT_RESULTS,
      results: response
    });
  }
  catch (error) {
    console.log(error);
  }
}
