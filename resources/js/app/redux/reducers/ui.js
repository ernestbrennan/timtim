import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  isGeofilterPanelOpen: false,
  isFilterPanelOpen: false,
  isCitiesDrawerOpen: false,
  isMenuDrawerOpen: false,
  isFiltersPanelHidden: false,
  isTopAdBarOpen: true,
  isFavoritesOpen: false,
  flatImages: null,
  flatLandlords: null,

  realtyAdvertiser: null,
  shownPhonesByFlatId: {},
  language: null,
};
const updatePhones = (prevState, flatId, landlords) => {
  if (prevState[flatId]) {
    return prevState;
  }
  const phone = landlords && landlords[0] && landlords[0].phone ? landlords[0].phone[0] || '' : '';

  return {...prevState, [flatId]: phone};
};
export default function ui(state = initialState, {type, payload}) {
  switch (type) {
    case ActionTypes.GEOFILTER_PANEL_DISPLAY_CHANGE:
      return {
        ...state,
        isFilterPanelOpen: payload === true ? false : state.isFilterPanelOpen,
        isGeofilterPanelOpen: payload,
      };
    case ActionTypes.FILTER_PANEL_DISPLAY_CHANGE:
      return {
        ...state,
        isGeofilterPanelOpen: payload === true ? false : state.isGeofilterPanelOpen,
        isFilterPanelOpen: payload,
      };
    case ActionTypes.CITIES_PANEL_DISPLAY_CHANGE:
      return {
        ...state,
        isCitiesDrawerOpen: payload,
      };
    case ActionTypes.SIDE_MENU_DISPLAY_CHANGE:
      return {
        ...state,
        isMenuDrawerOpen: payload,
      };
    case ActionTypes.TOP_AD_BAR_DISPLAY_CHANGE:
      return payload === state.isTopAdBarOpen
        ? state
        : {
          ...state,
          isTopAdBarOpen: payload,
        };
    case ActionTypes.FILTER_PANEL_VISIBILITY_CHANGE:
      return payload === state.isFiltersPanelHidden
        ? state
        : {...state, isFiltersPanelHidden: payload};

    case ActionTypes.CITY_CHANGED:
    case ActionTypes.MAP_FLAT_SELECTED:
      return {
        ...state,
        isGeofilterPanelOpen: false,
        isFilterPanelOpen: false,
        isFiltersPanelHidden: false,
      };
    case ActionTypes.SHOW_FLAT_IMAGES:
      return {
        ...state,
        flatImages: payload,
      };
    case ActionTypes.SHOW_REALTY_ADVERTISER:
      return payload ? {...state, realtyAdvertiser: payload?.advertiser} : {...state, realtyAdvertiser: null};
    case ActionTypes.SHOW_FAVORITES:
      return {
        ...state,
        isFavoritesOpen: true,
      };
    case ActionTypes.HIDE_FAVORITES:
      return {
        ...state,
        isFavoritesOpen: false,
      };
    case ActionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
}
