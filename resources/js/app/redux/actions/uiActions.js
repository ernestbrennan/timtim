import * as ActionTypes from './actionTypes';

export function onActiveUIRegionFilterChanged(results) {
  return {
    type: ActionTypes.ACTIVE_UI_REGION_FILTER_CHANGED,
    payload: results,
  };
}

export function onGeofilterPanelDisplayChanged(results) {
  return {
    type: ActionTypes.GEOFILTER_PANEL_DISPLAY_CHANGE,
    payload: results,
  };
}

export function onFilterPanelDisplayChanged(results) {
  return {
    type: ActionTypes.FILTER_PANEL_DISPLAY_CHANGE,
    payload: results,
  };
}

export function onFilterPanelVisibilityChangeRequest(results) {
  return {
    type: ActionTypes.FILTER_PANEL_VISIBILITY_CHANGE_REQUEST,
    payload: results,
  };
}

export function onFilterPanelVisibilityChanged(results) {
  return {
    type: ActionTypes.FILTER_PANEL_VISIBILITY_CHANGE,
    payload: results,
  };
}

export function onListFlatHighlighted(flatId) {
  return {
    type: ActionTypes.LIST_FLAT_HIGHTLIGHT,
    payload: flatId,
  };
}

export function onGeoZoomSelected(realtyId) {
  return {
    type: ActionTypes.LIST_FLAT_GEO_ZOOM,
    payload: realtyId,
  };
}

export function onMapRealtySelected(geohash) {
  return {
    type: ActionTypes.MAP_FLAT_SELECTED,
    payload: geohash,
  };
}

export function onRoomFilterValueAdded(value) {
  return {
    type: ActionTypes.ROOM_FILTER_VALUE_ADD,
    payload: value,
  };
}

export function onRoomFilterValueRemoved(value) {
  return {
    type: ActionTypes.ROOM_FILTER_VALUE_REMOVE,
    payload: value,
  };
}
export function onRoomFilterValuesChanged(values) {
  return {
    type: ActionTypes.ROOM_FILTER_VALUES_CHANGE,
    payload: values,
  };
}

export function onPriceRangeChange(value) {
  return {
    type: ActionTypes.PRICE_RANGE_FILTER_CHANGE,
    payload: value,
  };
}

export function onPriceMaxChange(value) {
  return {
    type: ActionTypes.PRICE_MAX_FILTER_CHANGE,
    payload: value,
  };
}

export function onSizeRangeChange(value) {
  return {
    type: ActionTypes.SIZE_RANGE_FILTER_CHANGE,
    payload: value,
  };
}

export function onCurrencyChange(value) {
  return {
    type: ActionTypes.CURRENCY_FILTER_CHANGE,
    payload: value,
  };
}

export function onIsOwnerFilterChange(value) {
  return {
    type: ActionTypes.IS_OWNER_FILTER_CHANGE,
    payload: value,
  };
}

export function onFirstFloorFilterChange(value) {
  return {
    type: ActionTypes.IS_NOT_FIRST_FLOOR_FILTER_CHANGE,
    payload: value,
  };
}

export function onLastFloorFilterChange(value) {
  return {
    type: ActionTypes.IS_NOT_LAST_FLOOR_FILTER_CHANGE,
    payload: value,
  };
}

export function onCitiesDrawerDisplayChange(value) {
  return {
    type: ActionTypes.CITIES_PANEL_DISPLAY_CHANGE,
    payload: value,
  };
}

export function onCityValueChanged(value) {
  return {
    type: ActionTypes.CITY_CHANGED,
    payload: value,
  };
}

export function onSideMenuDisplayChange(value) {
  return {
    type: ActionTypes.SIDE_MENU_DISPLAY_CHANGE,
    payload: value,
  };
}

export function onTopAdBarDisplayChanged(value) {
  return {
    type: ActionTypes.TOP_AD_BAR_DISPLAY_CHANGE,
    payload: value,
  };
}

export function showFlatImages(images) {
  return {
    type: ActionTypes.SHOW_FLAT_IMAGES,
    payload: images,
  };
}

export function showRealtyAdvertiser(advertiser) {
  return {
    type: ActionTypes.SHOW_REALTY_ADVERTISER,
    payload: advertiser,
  };
}

export function onMainPageOpen(payload) {
  return {
    type: ActionTypes.MAIN_PAGE_OPENED,
    payload,
  };
}

export function onAdvTypeChanged(advType) {
  return {
    type: ActionTypes.ADV_TYPE_CHANGED,
    payload: advType,
  };
}

export function onShowFavorites() {
  return {
    type: ActionTypes.SHOW_FAVORITES,
  };
}

export function onHideFavorites() {
  return {
    type: ActionTypes.HIDE_FAVORITES,
  };
}

export function onDueDateChange(dueDate) {
  return {
    type: ActionTypes.DUE_DATE_CHANGED,
    payload: dueDate,
  };
}

export function setSearchType(type) {
  return {
    type: ActionTypes.SET_SEARCH_TYPE,
    payload: type,
  };
}

export function getResetFilters() {
  return {
    type: ActionTypes.RESET_FILTERS,
  };
}


export function getSetLanguage(language) {
  return {
    type: ActionTypes.CHANGE_LANGUAGE,
    payload: language,
  };
}

export function onRealtyTypesSelectChange(id) {
  return {
    type: ActionTypes.REALTY_TYPES_SELECT_CHANGE,
    payload: id,
  };
}
export function onRealtyTypesReset() {
  return {
    type: ActionTypes.REALTY_TYPES_RESET,
  };
}
