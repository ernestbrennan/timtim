import {call, delay, put, select} from "redux-saga/effects";
import {DEFAULT_END_SEARCH_INDEX, DEFAULT_START_SEARCH_INDEX, SEARCH_ACTION_DEBOUNCE_DELAY} from "./rootSaga";

import {SearchType} from "../reducers/search";
import {
  searchLoadRealtyList,
  searchLoadGeo,
  searchLoadComplexList,
  searchUpdated as searchUpdatedAction

} from "../actions/apiActions";

const getSearchType = (state) => state.search.searchType;
const getCurrentCity = (state) => state.cities.currentCityId;

export function* searchUpdated(useDebounce = true) {
  const searchType = yield select(getSearchType);
  const currentCityId = yield select(getCurrentCity);

  if (!currentCityId) {
    return;
  }

  if (window.location.pathname.includes('favourites')) {
    return; // TODO: fix loading the data in favourites
  }

  if (useDebounce) {
    yield delay(SEARCH_ACTION_DEBOUNCE_DELAY);

    yield put(searchUpdatedAction())
  }

  if (searchType === SearchType.complex) {
    yield put(searchLoadComplexList(DEFAULT_START_SEARCH_INDEX, DEFAULT_END_SEARCH_INDEX));
  }

  if (searchType === SearchType.realty) {
    yield put(searchLoadRealtyList(DEFAULT_START_SEARCH_INDEX, DEFAULT_END_SEARCH_INDEX));
  }

  yield put(searchLoadGeo());
}

export function* loadFirstSearch() {
  yield searchUpdated(false);
}
