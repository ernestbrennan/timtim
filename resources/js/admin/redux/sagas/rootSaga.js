import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {optionsLoaded} from '../actions/apiActions';
import {LOAD_OPTIONS} from '../actions/actionTypes'
import {options as getOptions} from '$admin/api/app'

function* loadOptions() {
  const {results} = yield call(getOptions);
  yield put(optionsLoaded(results));
}

export default function* rootSaga() {
  yield takeLatest(LOAD_OPTIONS, loadOptions);
}
