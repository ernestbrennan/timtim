import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  featuresLoaded,
  realtyOptionsLoaded,
  searchRealtyListLoaded,
  searchComplexListLoaded,
  searchGeoLoaded,
} from '../actions/apiActions';
import {
  ADD_LAYOUT_TO_FAVORITES,
  ADD_RC_TO_FAVORITES,
  ADD_TO_FAVORITES,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHANGE_LANGUAGE,
  CITY_CHANGED,
  REALTY_LIST_PAGE_OPENED,
  IS_NOT_FIRST_FLOOR_FILTER_CHANGE,
  IS_NOT_LAST_FLOOR_FILTER_CHANGE,
  IS_OWNER_FILTER_CHANGE,
  LOAD_FEATURES,
  MAIN_PAGE_OPENED,
  PRICE_RANGE_FILTER_CHANGE,
  REMOVE_FROM_FAVORITES,
  REMOVE_LAYOUT_FROM_FAVORITES,
  REMOVE_RC_FROM_FAVORITES,
  RESET_FILTERS,
  ROOM_FILTER_VALUE_ADD,
  ROOM_FILTER_VALUE_REMOVE,
  ROOM_FILTER_VALUES_CHANGE,
  SEARCH_CHANGE_ORDER,
  SEARCH_LOAD_REALTY_LIST,
  SEARCH_LOAD_COMPLEX_LIST,
  SEARCH_LOAD_GEO,
  SIZE_RANGE_FILTER_CHANGE,
  COMPLEX_LIST_PAGE_OPENED,
  REALTY_TYPES_SELECT_CHANGE,
  REALTY_TYPES_RESET, CURRENCY_FILTER_CHANGE
} from '../actions/actionTypes'

import {SearchType} from '../reducers/search';
import {
  addLayoutToFavorites,
  addRCToFavorites,
  addToFavorites,
  removeFromFavorites,
  removeLayoutFromFavorites,
  removeRCFromFavorites,
} from './favouritesSaga';
import loadFavorites from './loadFavouritesSaga';
import {loadCities} from "./loadGeoSaga";
import {loadFirstSearch, searchUpdated} from "./searchSaga";

import {onAuthLogout} from '../actions/authActions';
import getApi from '$app/api';
import {selectFilters, selectAdvType, selectSearchFilters} from "$app/redux/selectors/selectors";
import {getRealty as geoGetRealty, getComplex as geoGetComplex} from '$app/api/geo'
import {getList as getRealtyList, getOptions as getRealtyOptions,} from '$app/api/realty'
import {getList as getComplexList} from '$app/api/complex'
import {getList as getFeatureList} from '$app/api/feature'
import AuthService from "$app/services/AuthService";

export const SEARCH_ACTION_DEBOUNCE_DELAY = 750;
export const DEFAULT_START_SEARCH_INDEX = 0;
export const DEFAULT_END_SEARCH_INDEX = 20;

const searchActions = [
  ROOM_FILTER_VALUE_ADD,
  ROOM_FILTER_VALUE_REMOVE,
  ROOM_FILTER_VALUES_CHANGE,
  IS_NOT_LAST_FLOOR_FILTER_CHANGE,
  IS_NOT_FIRST_FLOOR_FILTER_CHANGE,
  IS_OWNER_FILTER_CHANGE,
  PRICE_RANGE_FILTER_CHANGE,
  CITY_CHANGED,
  SIZE_RANGE_FILTER_CHANGE,
  CURRENCY_FILTER_CHANGE,
  RESET_FILTERS,
  SEARCH_CHANGE_ORDER,
  REALTY_TYPES_SELECT_CHANGE,
  REALTY_TYPES_RESET
];

export const getIsAuthentificated = (state) => state.auth.isAuthenticated;

const getSearchOrder = (state) => state.search.order;

const getSearchType = (state) => state.search.searchType;

function* fetchRealtyList({payload: {page = 1},}) {
  const order = yield select(getSearchOrder);
  const filters = yield select(selectSearchFilters);

  const {results} = yield call(getRealtyList, {...filters, page, order});
  yield put(searchRealtyListLoaded(results));
}
function* fetchComplexList({payload: {start = DEFAULT_START_SEARCH_INDEX, end = DEFAULT_END_SEARCH_INDEX},}) {
  const order = yield select(getSearchOrder);
  const filters = yield select(selectSearchFilters);

  const {results} = yield call(getComplexList, filters);
  yield put(searchComplexListLoaded(results));
}

function* fetchGeoJson() {
  const searchType = yield select(getSearchType);
  const filters = yield select(selectSearchFilters);

  if (searchType === SearchType.realty) {

    const {results} = yield call(geoGetRealty, filters);

    return yield put(searchGeoLoaded(results));
  }

  if (searchType === SearchType.complex) {
    const {results} = yield call(geoGetComplex, filters);

    return yield put(searchGeoLoaded(results));
  }
}

function* loadFeatures() {
  const {results} = yield call(getFeatureList);
  yield put(featuresLoaded(results));
}

function* loadMapInitialData() {
  yield loadFavorites();
}

function* updateLocalizationData({payload}) {
  const api = getApi();
  api.setLanguage(payload);
  yield call(loadCities);
  yield call(loadRealtyOptions);
}

function* loadRealtyOptions() {
  const {results} = yield call(getRealtyOptions);
  yield put(realtyOptionsLoaded(results));
}

function* loadAuthData() {

  try {
    const user = yield call(AuthService.getInstance().loadUser);
    // yield call(loadFavorites, user);
  } catch (e) {
    yield put(onAuthLogout());
  }
}
function* signOut() {
  try {
    yield call(AuthService.getInstance().signOut);

  } catch (e) {}
  finally {
    AuthService.getInstance().setToken('');
  }
}

export default function* rootSaga() {
  yield takeEvery(MAIN_PAGE_OPENED, loadMapInitialData);
  yield takeEvery([REALTY_LIST_PAGE_OPENED, COMPLEX_LIST_PAGE_OPENED], loadFirstSearch);

  yield takeLatest(searchActions, searchUpdated);
  yield takeLatest(SEARCH_LOAD_COMPLEX_LIST, fetchComplexList);
  yield takeLatest(SEARCH_LOAD_REALTY_LIST, fetchRealtyList);
  yield takeLatest(SEARCH_LOAD_GEO, fetchGeoJson);
  yield takeLatest(LOAD_FEATURES, loadFeatures);

  yield takeLatest(AUTH_SUCCESS, loadAuthData);
  yield takeEvery(AUTH_LOGOUT, signOut);

  yield takeEvery(ADD_TO_FAVORITES, addToFavorites);
  yield takeEvery(REMOVE_FROM_FAVORITES, removeFromFavorites);
  yield takeEvery(ADD_RC_TO_FAVORITES, addRCToFavorites);
  yield takeEvery(REMOVE_RC_FROM_FAVORITES, removeRCFromFavorites);
  yield takeEvery(ADD_LAYOUT_TO_FAVORITES, addLayoutToFavorites);
  yield takeEvery(REMOVE_LAYOUT_FROM_FAVORITES, removeLayoutFromFavorites);

  yield takeLatest(CHANGE_LANGUAGE, updateLocalizationData);
}
