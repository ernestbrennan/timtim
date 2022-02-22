import {call, put} from "redux-saga/effects";
import {citiesLoaded} from "../actions/apiActions";
import {getList} from "$app/api/city";

export function* loadCities() {
  const {results} = yield call(getList);

  yield put(citiesLoaded(results));
}
