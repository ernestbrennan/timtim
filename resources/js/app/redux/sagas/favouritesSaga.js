import { call, put, select } from 'redux-saga/effects';
import { getIsAuthentificated } from './rootSaga';
import {
  favtoriteAdded,
  favtoriteRemoved,
  getAddLayoutFavouriteSuccess,
  getAddLocalLayoutFavorite,
  getAddLocalRCFavorite,
  getAddRCFavouriteSuccess,
  getRemoveLayoutFavouriteSuccess,
  getRemoveLocalLayoutFavourite,
  getRemoveLocalRCFavourite,
  getRemoveRCFavouriteSuccess,
  localFavoriteAdded,
  localFavoriteRemoved,
} from '../actions/apiActions';
import FirebaseService from '$app/services/firebase/FirebaseService';
import getApi from '$app/api';

const client = getApi();

const getRCFavourites = (state) => state.search.RCFavoritesList;
const getLayoutFavourites = (state) => state.search.layoutsFavoritesList;
const getFavorites = (state) => state.search.favoritesList;

export function* addToFavorites({ payload }) {
  const flatId = Number(payload.flatId);
  const isAuthenticated = yield select(getIsAuthentificated);
  if (isAuthenticated) {
    const token = yield call([
      FirebaseService.getInstance(),
      FirebaseService.getInstance().getIdToken,
    ]);
    const results = yield call([client, client.addToFavorites], flatId, token);
    if (results.data.status === 201 || results.data.status === 201) {
      yield put(favtoriteAdded(results.data.results));
    }
  } else {
    yield put(localFavoriteAdded(flatId));
  }
}

export function* removeFromFavorites({ payload }) {
  const flatId = Number(payload.flatId);
  const isAuthenticated = yield select(getIsAuthentificated);
  if (isAuthenticated) {
    const favorites = yield select(getFavorites);
    const favorite = favorites.find((f) => Number(f.flat) === flatId);
    if (!favorite) {
      return;
    }

    const token = yield call([
      FirebaseService.getInstance(),
      FirebaseService.getInstance().getIdToken,
    ]);
    const results = yield call([client, client.removeFromFavorites], favorite.id, token);
    if (results.data.status === 204 || results.data.status === 200) {
      yield put(favtoriteRemoved(flatId));
    }
  } else {
    yield put(localFavoriteRemoved(flatId));
  }
}

export function* addRCToFavorites({ payload }) {
  const complexId = Number(payload.complexId);
  const isAuthenticated = yield select(getIsAuthentificated);
  if (isAuthenticated) {
    const results = yield call([client, client.addRCToFavorites], complexId);
    if (results.data.status === 201 || results.data.status === 200) {
      yield put(getAddRCFavouriteSuccess(results.data.results.complex));
    } else {
      yield put(getAddLocalRCFavorite(complexId));
    }
  } else {
    yield put(getAddLocalRCFavorite(complexId));
  }
}

export function* removeRCFromFavorites({ payload }) {
  const complexId = Number(payload.complexId);
  const isAuthenticated = yield select(getIsAuthentificated);
  if (isAuthenticated) {
    const favorites = yield select(getRCFavourites);
    const favorite = favorites.find((favourite) => Number(favourite.complex) === complexId);
    if (!favorite) {
      return;
    }
    const results = yield call([client, client.removeRCFromFavorites], favorite.id);
    if (results.data.status === 204 || results.data.status === 200) {
      yield put(getRemoveRCFavouriteSuccess(complexId));
    } else {
      yield put(getRemoveLocalRCFavourite(complexId));
    }
  }
  yield put(getRemoveLocalRCFavourite(complexId));
}

export function* addLayoutToFavorites({ payload }) {
  const layoutIdAsNumber = Number(payload);
  const isAuthenticated = yield select(getIsAuthentificated);
  if (isAuthenticated) {
    const response = yield call([client, client.addLayoutToFavorites], layoutIdAsNumber);
    if (response.data.status === 201 || response.data.status === 200) {
      yield put(getAddLayoutFavouriteSuccess(layoutIdAsNumber));
    } else {
      yield put(getAddLocalLayoutFavorite(layoutIdAsNumber));
    }
  } else {
    yield put(getAddLocalLayoutFavorite(layoutIdAsNumber));
  }
}

export function* removeLayoutFromFavorites({ payload }) {
  const layoutIdAsNumber = Number(payload);
  const isAuthenticated = yield select(getIsAuthentificated);
  if (isAuthenticated) {
    const favorites = yield select(getLayoutFavourites);
    const favorite = favorites.find((favourite) => Number(favourite.layout) === layoutIdAsNumber);
    if (!favorite) {
      return;
    }
    const results = yield call([client, client.removeLayoutFromFavorites], favorite.id);
    if (results.data.status === 204 || results.data.status === 200) {
      yield put(getRemoveLayoutFavouriteSuccess(layoutIdAsNumber));
    } else {
      yield put(getRemoveLocalLayoutFavourite(layoutIdAsNumber));
    }
  }
  yield put(getRemoveLocalLayoutFavourite(layoutIdAsNumber));
}
