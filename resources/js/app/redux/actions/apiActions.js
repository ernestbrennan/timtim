import * as ActionTypes from './actionTypes';

export function realtyOptionsLoaded(results) {
  return {type: ActionTypes.REALTY_OPTIONS_LOADED, payload: results};
}

export function citiesLoaded(results) {
  return {type: ActionTypes.CITIES_LOADED, payload: results};
}

export function searchUpdated() {
  return {type: ActionTypes.SEARCH_UPDATED};
}

export function getRealtyListPageOpened() {
  return {
    type: ActionTypes.REALTY_LIST_PAGE_OPENED,
  };
}

export function getComplexListPageOpened() {
  return {
    type: ActionTypes.COMPLEX_LIST_PAGE_OPENED,
  };
}

export function searchLoadRealtyList(page) {
  return {type: ActionTypes.SEARCH_LOAD_REALTY_LIST, payload: {page}};
}

export function searchRealtyListLoaded(results, start, end) {
  return {type: ActionTypes.SEARCH_REALTY_LIST_LOADED, payload: {results, start, end}};
}

export function searchLoadComplexList(start, end) {
  return {type: ActionTypes.SEARCH_LOAD_COMPLEX_LIST, payload: {start, end}};
}

export function searchComplexListLoaded(results, start, end) {
  return {type: ActionTypes.SEARCH_COMPLEX_LIST_LOADED, payload: {results, start, end}};
}

export function searchLoadGeo() {
  return {type: ActionTypes.SEARCH_LOAD_GEO};
}

export function loadFeatures() {
  return {type: ActionTypes.LOAD_FEATURES};
}

export function featuresLoaded(results) {
  return {type: ActionTypes.FEATURES_LOADED, payload: results};
}


export function searchGeoLoaded(results) {
  return {type: ActionTypes.SEARCH_GEO_LOADED, payload: results};
}

export function searchChangeOrder(payload) {
  return {type: ActionTypes.SEARCH_CHANGE_ORDER, payload};
}

export function favoritesLoaded(results) {
  return {type: ActionTypes.FAVORITES_LOADED, payload: results};
}

export function addToFavorites(flatId) {
  return {type: ActionTypes.ADD_TO_FAVORITES, payload: {flatId}};
}

export function favtoriteAdded(payload) {
  return {type: ActionTypes.ADD_TO_FAVORITES_SUCCESS, payload};
}

export function removeFromFavorites(flatId) {
  return {type: ActionTypes.REMOVE_FROM_FAVORITES, payload: {flatId}};
}

export function favtoriteRemoved(payload) {
  return {type: ActionTypes.REMOVE_FROM_FAVORITES_SUCCESS, payload};
}

export function localFavoriteAdded(payload) {
  return {type: ActionTypes.ADD_TO_LOCAL_FAVORITES_SUCCESS, payload};
}

export function localFavoriteRemoved(payload) {
  return {type: ActionTypes.REMOVE_FROM_LOCAL_FAVORITES_SUCCESS, payload};
}

export function purgeLocalFavorites(favType) {
  return {
    type: ActionTypes.PURGE_LOCAL_FAVORITES,
    payload: favType,
  };
}

export function getAddRCFavourite(complexId) {
  return {
    type: ActionTypes.ADD_RC_TO_FAVORITES,
    payload: {complexId},
  };
}

export function getAddRCFavouriteSuccess(complexId) {
  return {
    type: ActionTypes.ADD_RC_TO_FAVORITES_SUCCESS,
    payload: {complexId},
  };
}

export function getAddLocalRCFavorite(complexId) {
  return {
    type: ActionTypes.ADD_RC_TO_LOCAL_FAVORITES_SUCCESS,
    payload: {complexId},
  };
}

export function getRemoveRCFavourite(complexId) {
  return {
    type: ActionTypes.REMOVE_RC_FROM_FAVORITES,
    payload: {complexId},
  };
}

export function getRemoveRCFavouriteSuccess(complexId) {
  return {
    type: ActionTypes.REMOVE_RC_FROM_FAVORITES_SUCCESS,
    payload: {complexId},
  };
}

export function getRemoveLocalRCFavourite(complexId) {
  return {
    type: ActionTypes.REMOVE_RC_FROM_LOCAL_FAVORITES_SUCCESS,
    payload: {complexId},
  };
}

export function getRCFavouritesLoaded(favourites) {
  return {
    type: ActionTypes.RC_FAVORITES_LOADED,
    payload: favourites,
  };
}

export function getLayoutsFavouritesLoaded(favourites) {
  return {
    type: ActionTypes.LAYOUT_FAVORITES_LOADED,
    payload: favourites,
  };
}

export function getAddLayoutFavourite(layoutId) {
  return {
    type: ActionTypes.ADD_LAYOUT_TO_FAVORITES,
    payload: layoutId,
  };
}

export function getAddLayoutFavouriteSuccess(layoutId) {
  return {
    type: ActionTypes.ADD_LAYOUT_TO_FAVORITES_SUCCESS,
    payload: layoutId,
  };
}

export function getAddLocalLayoutFavorite(layoutId) {
  return {
    type: ActionTypes.ADD_LAYOUT_TO_LOCAL_FAVORITES_SUCCESS,
    payload: layoutId,
  };
}

export function getRemoveLayoutFavourite(layoutId) {
  return {
    type: ActionTypes.REMOVE_LAYOUT_FROM_FAVORITES,
    payload: layoutId,
  };
}

export function getRemoveLayoutFavouriteSuccess(layoutId) {
  return {
    type: ActionTypes.REMOVE_LAYOUT_FROM_FAVORITES_SUCCESS,
    payload: layoutId,
  };
}

export function getRemoveLocalLayoutFavourite(layoutId) {
  return {
    type: ActionTypes.REMOVE_LAYOUT_FROM_LOCAL_FAVORITES_SUCCESS,
    payload: layoutId,
  };
}

export function getSetRCSearchCount(count) {
  return {
    type: ActionTypes.SET_RC_SEARCH_COUNT,
    payload: count,
  };
}

