import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as ActionTypes from '../actions/actionTypes';
import { FavouriteTypes } from '../const/const';

export const SearchType = {
  realty: 'realty',
  complex: 'complex',
};

export const searchSortOrders = {
  verifiedFirst: '-is_verified,-created_at',

  date: 'created_at',
  priceAsc: 'price_asc',
  priceDesc: 'price_desc',
};

const initialState = {
  searchId: null,

  //realty
  realtyList: [],
  realtyPagination: {},
  realtyListHighlightedId: null,

  //complex
  complexList: [],
  complexPagination: {},
  complexListHighlightedId: null,

  count: null,
  visibleCount: null,
  geojson: null,
  highlightedFlatId: null,
  selectedMapFlatGeohash: null,
  selectedListFlatGeohash: null,
  bbox: null,
  histogram: null,
  order: searchSortOrders.date,
  flatsById: {},
  currentFlatId: null,
  favorites: new Set(),
  RCFavorites: new Set(),
  layoutsFavorites: new Set(),
  favoritesList: [],
  RCFavoritesList: [],
  layoutsFavoritesList: [],
  localFavorites: [],
  localRCFavorites: [],
  localLayoutsFavorites: [],
  searchType: SearchType.realty,
  RCCount: 0,
  visibleRCCount: 0,
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['localFavorites', 'localRCFavorites', 'localLayoutsFavorites'],
};

const getFlats = (initial, list, start, end) => {

  const newList = [...initial];
  for (let n = start; n < end; n++) {
    newList[n] = list[n - start];
  }
  return newList;
};

function search(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.CITY_CHANGED:
      return {
        ...state,
        realtyList: [],
        realtyPagination: {},
      };

    case ActionTypes.REALTY_LIST_PAGE_OPENED:
      return {
        ...state,
        realtyList: [],
        realtyPagination: {},
      };

    case ActionTypes.SEARCH_REALTY_LIST_LOADED:

      console.log([...state.realtyList, ...payload.results.data])
      return {
        ...state,
        realtyList: [...state.realtyList, ...payload.results.data],
        realtyPagination: payload.results.pagination,
      };

    case ActionTypes.REALTY_LIST_HIGHLIGHT:
      return state.realtyListHighlightedId !== payload
        ? {...state, realtyListHighlightedId: payload}
        : state;

    case ActionTypes.SEARCH_COMPLEX_LIST_LOADED:
      return {
        ...state,
        complexList: [...state.complexList, ...payload.results.data],
        complexPagination: payload.results.pagination,
      };

    case ActionTypes.SEARCH_GEO_LOADED:
      return {
        ...state,
        geojson: payload.geojson,
        bbox: payload.bbox,
        histogram: payload.histogram,
      };

    case ActionTypes.LIST_FLAT_HIGHTLIGHT:
      return state.highlightedFlatId !== payload
        ? {
            ...state,
            highlightedFlatId: payload,
          }
        : state;
    case ActionTypes.LIST_FLAT_GEO_ZOOM:
      return state.selectedListFlatGeohash !== payload
        ? {
            ...state,
            selectedListFlatGeohash: payload,
          }
        : state;
    case ActionTypes.MAP_FLAT_SELECTED:
      return state.selectedMapFlatGeohash !== payload
        ? {
            ...state,
            selectedMapFlatGeohash: payload,
          }
        : state;
    case ActionTypes.SEARCH_UPDATED:
      return {
        ...state,
        realtyList: [],
        realtyPagination: {},
      };
    case ActionTypes.SEARCH_CHANGE_ORDER:
      return {
        ...state,
        order: payload,
        realtyList: [],
        realtyPagination: {},
      };
    case ActionTypes.FAVORITES_LOADED: {
      return {
        ...state,
        favorites: new Set(payload.map((f) => f.flat)),
        favoritesList: payload,
      };
    }
    case ActionTypes.ADD_TO_FAVORITES_SUCCESS: {
      const newList = [payload, ...state.favoritesList];
      return {
        ...state,
        favorites: new Set(newList.map((f) => f.flat)),
        favoritesList: newList,
      };
    }
    case ActionTypes.REMOVE_FROM_FAVORITES_SUCCESS: {
      const newList = state.favoritesList.filter((f) => f.flat !== payload);
      return {
        ...state,
        favorites: new Set(newList.map((f) => f.flat)),
        favoritesList: newList,
      };
    }
    case ActionTypes.ADD_TO_LOCAL_FAVORITES_SUCCESS: {
      return state.localFavorites.some((f) => f === payload)
        ? state
        : {
            ...state,
            favorites: new Set([...state.favorites, payload]),
            localFavorites: [...state.localFavorites, payload],
          };
    }
    case ActionTypes.REMOVE_FROM_LOCAL_FAVORITES_SUCCESS: {
      state.favorites.delete(payload);
      return {
        ...state,
        localFavorites: state.localFavorites.filter((f) => f !== payload),
        favorites: new Set(state.favorites),
      };
    }
    case ActionTypes.PURGE_LOCAL_FAVORITES: {
      let newState;
      switch (payload) {
        case FavouriteTypes.rentAndSale: {
          newState = {
            ...state,
            localFavorites: [],
          };
          break;
        }
        case FavouriteTypes.complexes: {
          newState = {
            ...state,
            localRCFavorites: [],
          };
          break;
        }
        case FavouriteTypes.layouts: {
          newState = {
            ...state,
            localLayoutsFavorites: [],
          };
          break;
        }
        default: {
          throw new Error(`Unknown fav type ${payload}`);
        }
      }
      return newState;
    }

    case ActionTypes.RC_FAVORITES_LOADED: {
      return {
        ...state,
        RCFavorites: new Set([...payload.map((f) => f.complex), ...state.localRCFavorites]),
        RCFavoritesList: payload,
      };
    }
    case ActionTypes.ADD_RC_TO_FAVORITES_SUCCESS: {
      return {
        ...state,
        RCFavorites: new Set([...state.RCFavorites, payload.complexId]),
        RCFavoritesList: [...state.RCFavoritesList, payload.complexId],
      };
    }
    case ActionTypes.REMOVE_RC_FROM_FAVORITES_SUCCESS: {
      const newList = state.RCFavoritesList.filter((f) => f.complex !== payload.complexId);
      return {
        ...state,
        RCFavorites: new Set(newList.map((f) => f.complex)),
        RCFavoritesList: newList,
      };
    }
    case ActionTypes.ADD_RC_TO_LOCAL_FAVORITES_SUCCESS: {
      state.RCFavorites.add(payload.complexId);
      const newSet = new Set([...state.RCFavorites]);
      return state.localRCFavorites.some((f) => f === payload.complexId)
        ? state
        : {
            ...state,
            RCFavorites: newSet,
            localRCFavorites: [...state.localRCFavorites, payload.complexId],
          };
    }
    case ActionTypes.REMOVE_RC_FROM_LOCAL_FAVORITES_SUCCESS: {
      state.RCFavorites.delete(payload.complexId);
      const newSet = new Set([...state.RCFavorites]);
      return {
        ...state,
        RCFavorites: newSet,
        localRCFavorites: state.localRCFavorites.filter((f) => f !== payload.complexId),
      };
    }
    case ActionTypes.SET_SEARCH_TYPE: {
      return {
        ...state,
        searchType: payload,
      };
    }
    case ActionTypes.ADD_LAYOUT_TO_LOCAL_FAVORITES_SUCCESS: {
      const newSet = new Set([...state.layoutsFavorites.add(payload)]);
      return state.localLayoutsFavorites.some((f) => f === payload)
        ? state
        : {
            ...state,
            layoutsFavorites: newSet,
            localLayoutsFavorites: [...state.localLayoutsFavorites, payload],
          };
    }
    case ActionTypes.REMOVE_LAYOUT_FROM_LOCAL_FAVORITES_SUCCESS: {
      state.layoutsFavorites.delete(payload);
      const newSet = new Set([...state.layoutsFavorites]);
      return {
        ...state,
        layoutsFavorites: newSet,
        localLayoutsFavorites: state.localLayoutsFavorites.filter((f) => f !== payload),
      };
    }
    case ActionTypes.LAYOUT_FAVORITES_LOADED: {
      return {
        ...state,
        layoutsFavorites: new Set([
          ...payload.map((f) => f.layout),
          ...state.localLayoutsFavorites,
        ]),
        layoutsFavoritesList: payload,
      };
    }
    case ActionTypes.ADD_LAYOUT_TO_FAVORITES_SUCCESS: {
      return {
        ...state,
        layoutsFavorites: new Set([...state.layoutsFavorites, payload]),
        layoutsFavoritesList: [...state.layoutsFavoritesList, payload],
      };
    }
    case ActionTypes.REMOVE_LAYOUT_FROM_FAVORITES_SUCCESS: {
      const newList = state.layoutsFavoritesList.filter((f) => f.layout !== payload);
      return {
        ...state,
        layoutsFavorites: new Set(newList.map((f) => f.layout)),
        layoutsFavoritesList: newList,
      };
    }
    case ActionTypes.SET_RC_SEARCH_COUNT: {
      return {
        ...state,
        RCCount: payload.count,
        visibleRCCount: payload.visibleCount,
      };
    }
    default:
      return state;
  }
}

export default persistReducer(persistConfig, search);
