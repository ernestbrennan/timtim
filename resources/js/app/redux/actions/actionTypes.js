/**
 * API ACTIONS
 */
export const CITIES_LOADED = 'CITIES_LOADED';

export const REALTY_OPTIONS_LOADED = 'REALTY_OPTIONS_LOADED';


export const LOAD_FEATURES = 'LOAD_FEATURES';
export const FEATURES_LOADED = 'FEATURES_LOADED ';

export const SEARCH_UPDATED = 'SEARCH_UPDATED';
export const SEARCH_LOAD_REALTY_LIST = 'SEARCH_LOAD_REALTY_LIST';
export const SEARCH_LOAD_COMPLEX_LIST = 'SEARCH_LOAD_COMPLEX_LIST';
export const SEARCH_LOAD_GEO = 'SEARCH_LOAD_GEO';
export const SEARCH_CHANGE_ORDER = 'SEARCH_CHANGE_ORDER';
export const SEARCH_REALTY_LIST_LOADED = 'SEARCH_REALTY_LIST_LOADED';
export const SEARCH_COMPLEX_LIST_LOADED = 'SEARCH_COMPLEX_LIST_LOADED';
export const SEARCH_GEO_LOADED = 'SEARCH_GEO_LOADED';

export const FAVORITES_LOADED = 'FAVORITES_LOADED';
export const RC_FAVORITES_LOADED = 'RC_FAVORITES_LOADED';
export const LAYOUT_FAVORITES_LOADED = 'LAYOUT_FAVORITES_LOADED';

export const RESIDENTIAL_COMPLEXES_LOADED = 'RESIDENTIAL_COMPLEXES_LOADED';

/**
 * UI ACTIONS
 */

export const ACTIVE_UI_REGION_FILTER_CHANGED = 'ACTIVE_UI_REGION_FILTER_CHANGED';

export const GEOFILTER_PANEL_DISPLAY_CHANGE = 'GEOFILTER_PANEL_DISPLAY_CHANGE';

export const FILTER_PANEL_DISPLAY_CHANGE = 'FILTER_PANEL_DISPLAY_CHANGE';

export const FILTER_PANEL_VISIBILITY_CHANGE = 'FILTER_PANEL_VISIBILITY_CHANGE';

export const FILTER_PANEL_VISIBILITY_CHANGE_REQUEST = 'FILTER_PANEL_VISIBILITY_CHANGE';

export const LIST_FLAT_HIGHTLIGHT = 'LIST_FLAT_HIGHTLIGHT';

export const REALTY_LIST_HIGHLIGHT = 'REALTY_LIST_HIGHLIGHT';

export const LIST_FLAT_GEO_ZOOM = 'LIST_FLAT_GEO_ZOOM';

export const MAP_FLAT_SELECTED = 'MAP_FLAT_SELECTED';

export const CITIES_PANEL_DISPLAY_CHANGE = 'CITIES_PANEL_DISPLAY_CHANGE';

export const SIDE_MENU_DISPLAY_CHANGE = 'SIDE_MENU_DISPLAY_CHANGE';

export const TOP_AD_BAR_DISPLAY_CHANGE = 'TOP_AD_BAR_DISPLAY_CHANGE';

export const SHOW_FLAT_IMAGES = 'SHOW_FLAT_IMAGES';

export const SHOW_REALTY_ADVERTISER = 'SHOW_REALTY_ADVERTISER';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const ADD_TO_FAVORITES_SUCCESS = 'ADD_TO_FAVORITES_SUCCESS';

export const ADD_TO_LOCAL_FAVORITES_SUCCESS = 'ADD_TO_LOCAL_FAVORITES_SUCCESS';

export const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';

export const REMOVE_FROM_LOCAL_FAVORITES_SUCCESS = 'REMOVE_FROM_LOCAL_FAVORITES_SUCCESS';

export const PURGE_LOCAL_FAVORITES = 'PURGE_LOCAL_FAVORITES';

export const SHOW_FAVORITES = 'SHOW_FAVORITES';

export const HIDE_FAVORITES = 'HIDE_FAVORITES';

export const ADD_RC_TO_FAVORITES = 'ADD_RC_TO_FAVORITES';

export const ADD_RC_TO_FAVORITES_SUCCESS = 'ADD_RC_TO_FAVORITES_SUCCESS';

export const ADD_RC_TO_LOCAL_FAVORITES_SUCCESS = 'ADD_RC_TO_LOCAL_FAVORITES_SUCCESS';

export const REMOVE_RC_FROM_FAVORITES = 'REMOVE_RC_FROM_FAVORITES';

export const REMOVE_RC_FROM_FAVORITES_SUCCESS = 'REMOVE_RC_FROM_FAVORITES_SUCCESS';

export const REMOVE_RC_FROM_LOCAL_FAVORITES_SUCCESS = 'REMOVE_RC_FROM_LOCAL_FAVORITES_SUCCESS';

export const ADD_LAYOUT_TO_FAVORITES = 'ADD_LAYOUT_TO_FAVORITES';

export const ADD_LAYOUT_TO_FAVORITES_SUCCESS = 'ADD_LAYOUT_TO_FAVORITES_SUCCESS';

export const ADD_LAYOUT_TO_LOCAL_FAVORITES = 'ADD_LAYOUT_TO_LOCAL_FAVORITES';

export const ADD_LAYOUT_TO_LOCAL_FAVORITES_SUCCESS = 'ADD_LAYOUT_TO_LOCAL_FAVORITES_SUCCESS';

export const REMOVE_LAYOUT_FROM_FAVORITES = 'REMOVE_LAYOUT_FROM_FAVORITES';

export const REMOVE_LAYOUT_FROM_FAVORITES_SUCCESS = 'REMOVE_LAYOUT_FROM_FAVORITES_SUCCESS';

export const REMOVE_LAYOUT_FROM_LOCAL_FAVORITES = 'REMOVE_LAYOUT_FROM_LOCAL_FAVORITES';

export const REMOVE_LAYOUT_FROM_LOCAL_FAVORITES_SUCCESS = 'REMOVE_LAYOUT_FROM_LOCAL_FAVORITES_SUCCESS';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

/**
 * FILTERS ACTIONS
 */
export const ROOM_FILTER_VALUE_ADD = 'ROOM_FILTER_VALUE_ADD';
export const ROOM_FILTER_VALUE_REMOVE = 'ROOM_FILTER_VALUE_REMOVE';
export const ROOM_FILTER_VALUES_CHANGE = 'ROOM_FILTER_VALUES_CHANGE';
export const PRICE_RANGE_FILTER_CHANGE = 'PRICE_RANGE_FILTER_CHANGE';
export const PRICE_MAX_FILTER_CHANGE = 'PRICE_MAX_FILTER_CHANGE';
export const SIZE_RANGE_FILTER_CHANGE = 'SIZE_RANGE_FILTER_CHANGE';
export const CURRENCY_FILTER_CHANGE = 'CURRENCY_FILTER_CHANGE';
export const IS_OWNER_FILTER_CHANGE = 'IS_OWNER_FILTER_CHANGE';
export const IS_NOT_LAST_FLOOR_FILTER_CHANGE = 'IS_NOT_LAST_FLOOR_FILTER_CHANGE';
export const IS_NOT_FIRST_FLOOR_FILTER_CHANGE = 'IS_NOT_FIRST_FLOOR_FILTER_CHANGE';
export const REALTY_TYPES_SELECT_CHANGE = 'REALTY_TYPES_SELECT_CHANGE';
export const REALTY_TYPES_RESET = 'REALTY_TYPES_RESET';

export const CITY_CHANGED = 'CITY_CHANGED';

export const MAIN_PAGE_OPENED = 'MAIN_PAGE_OPENED';

export const REALTY_LIST_PAGE_OPENED = 'REALTY_LIST_PAGE_OPENED';
export const COMPLEX_LIST_PAGE_OPENED = 'COMPLEX_LIST_PAGE_OPENED';

export const ADV_TYPE_CHANGED = 'ADV_TYPE_CHANGED';

export const AUTH_REQUESTED = 'AUTH_REQUESTED';

export const AUTH_REQUEST_CANCELED = 'AUTH_REQUEST_CANCELED';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const SET_ANONYMOUS_LOGIN_TOKEN = 'SET_ANONYMOUS_LOGIN_TOKEN';

export const LOAD_RESIDENTIAL_COMPLEXES = 'LOAD_RESIDENTIAL_COMPLEXES';

export const DUE_DATE_CHANGED = 'DUE_DATE_CHANGED';

export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';

export const SET_RC_SEARCH_COUNT = 'SET_RC_SEARCH_COUNT';

export const RESET_FILTERS = 'RESET_FILTERS';
