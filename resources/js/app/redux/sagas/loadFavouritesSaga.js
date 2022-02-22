import { all, call, put, select } from 'redux-saga/effects';

import { addToFavorites, addLayoutToFavorites, addRCToFavorites } from './favouritesSaga';
import { FavouriteTypes } from '../const/const';
import FirebaseService from '../../services/firebase/FirebaseService';
import getApi from '$app/api';
import {
  favoritesLoaded,
  getLayoutsFavouritesLoaded,
  getRCFavouritesLoaded,
  purgeLocalFavorites,
} from '../actions/apiActions';

const client = getApi();

const getLocalFavorites = (state) => state.search.localFavorites;
const getLocalRCFavourites = (state) => state.search.localRCFavorites;
const getLocalLayoutsFavourites = (state) => state.search.localLayoutsFavorites;

function getFavFetcherNameForType(favouriteAdvType) {
  return {
    [FavouriteTypes.rentAndSale]: 'fetchFavorites',
    [FavouriteTypes.complexes]: 'fetchRCFavoritesIDs',
    [FavouriteTypes.layouts]: 'fetchLayoutFavoritesIds',
  }[favouriteAdvType];
}

function getLocalFavSelectorForType(favouriteAdvType) {
  return {
    [FavouriteTypes.rentAndSale]: getLocalFavorites,
    [FavouriteTypes.complexes]: getLocalRCFavourites,
    [FavouriteTypes.layouts]: getLocalLayoutsFavourites,
  }[favouriteAdvType];
}

function getLocalFavMapperForType(favouriteAdvType) {
  return {
    [FavouriteTypes.rentAndSale]: (fav) => ({ flat: fav }),
    [FavouriteTypes.complexes]: (fav) => ({ complex: fav }),
    [FavouriteTypes.layouts]: (fav) => ({ layout: fav }),
  }[favouriteAdvType];
}

function getFavLoadedActionCreatorForType(favouriteAdvType) {
  return {
    [FavouriteTypes.rentAndSale]: favoritesLoaded,
    [FavouriteTypes.complexes]: getRCFavouritesLoaded,
    [FavouriteTypes.layouts]: getLayoutsFavouritesLoaded,
  }[favouriteAdvType];
}

function* loadFavouritesByType(favouriteAdvType) {
  if (!Object.values(FavouriteTypes).includes(favouriteAdvType)) {
    throw new Error(`Unknown favourite type ${favouriteAdvType}`);
  }
  const token = yield call([
    FirebaseService.getInstance(),
    FirebaseService.getInstance().getIdToken,
  ]);
  const currentUser = yield call([
    FirebaseService.getInstance(),
    FirebaseService.getInstance().currentUser,
  ]);
  const finalFavourites = [];
  if (token && !currentUser?.isAnonymous) {
    const response = yield call(
      [client, client[getFavFetcherNameForType(favouriteAdvType)]],
      token,
    );
    if (response?.data?.results?.length > 0) {
      finalFavourites.push(...response.data.results);
    }
  }
  const localFavorites = yield select(getLocalFavSelectorForType(favouriteAdvType));
  if (localFavorites.length > 0) {
    finalFavourites.push(...localFavorites.map(getLocalFavMapperForType(favouriteAdvType)));
  }
  yield put(getFavLoadedActionCreatorForType(favouriteAdvType)(finalFavourites));
}

function getLocalFavSaverActionMapperForType(favouriteAdvType) {
  return {
    [FavouriteTypes.rentAndSale]: (f) => addToFavorites({ payload: { flatId: f } }),
    [FavouriteTypes.complexes]: (complexId) => addRCToFavorites({ payload: { complexId } }),
    [FavouriteTypes.layouts]: (layoutId) => addLayoutToFavorites({ payload: layoutId }),
  }[favouriteAdvType];
}

function* moveLocalFavouritesToServer(favouriteAdvType) {
  const token = yield call([
    FirebaseService.getInstance(),
    FirebaseService.getInstance().getIdToken,
  ]);
  if (!token) {
    throw new Error(`Can't save local fav on server without auth`);
  }
  const favourites = yield select(getLocalFavSelectorForType(favouriteAdvType));
  if (favourites.length > 0) {
    yield all(favourites.map(getLocalFavSaverActionMapperForType(favouriteAdvType)));
    yield put(purgeLocalFavorites(favouriteAdvType));
  }
}

function* loadFavorites(token) {
  yield loadFavouritesByType(FavouriteTypes.rentAndSale);
  yield loadFavouritesByType(FavouriteTypes.complexes);
  yield loadFavouritesByType(FavouriteTypes.layouts);

  const currentUser = yield call([
    FirebaseService.getInstance(),
    FirebaseService.getInstance().currentUser,
  ]);
  if (token && !currentUser?.isAnonymous) {
    yield moveLocalFavouritesToServer(FavouriteTypes.rentAndSale);
    yield moveLocalFavouritesToServer(FavouriteTypes.complexes);
    yield moveLocalFavouritesToServer(FavouriteTypes.layouts);
  }
}

export default loadFavorites;
