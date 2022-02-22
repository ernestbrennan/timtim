import * as ActionTypes from '../actions/actionTypes';
import { currencies } from '$js/config';
import { advTypes } from '$js/utils/realty';
import { DEFAULT_DUE_DATE_FILTERS } from '../const/const';
import FormGroup from "@material-ui/core/FormGroup/FormGroup";

const initialState = {
  rooms: [],
  priceMin: null,
  priceMax: null,
  sizeMin: null,
  sizeMax: null,
  currency: currencies.sum.value,
  isOwner: null,
  isNotFirstFloor: false,
  isNotLastFloor: false,
  advType: advTypes.rent,
  dueDate: DEFAULT_DUE_DATE_FILTERS,
  realtyTypesSelected: new Set(),
};

export default function filters(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.ROOM_FILTER_VALUE_ADD:
      return {
        ...state,
        rooms: [...state.rooms, payload],
      };
    case ActionTypes.ROOM_FILTER_VALUE_REMOVE:
      return {
        ...state,
        rooms: state.rooms.filter((r) => r !== payload),
      };
    case ActionTypes.ROOM_FILTER_VALUES_CHANGE:
      return {
        ...state,
        rooms: payload,
      };
    case ActionTypes.IS_NOT_LAST_FLOOR_FILTER_CHANGE:
      return {
        ...state,
        isNotLastFloor: !state.isNotLastFloor,
      };
    case ActionTypes.IS_NOT_FIRST_FLOOR_FILTER_CHANGE:
      return {
        ...state,
        isNotFirstFloor: !state.isNotFirstFloor,
      };
    case ActionTypes.CURRENCY_FILTER_CHANGE:
      return {
        ...state,
        currency: payload,
      };
    case ActionTypes.IS_OWNER_FILTER_CHANGE:
      return {
        ...state,
        isOwner: !state.isOwner ? true : null,
      };
    case ActionTypes.PRICE_RANGE_FILTER_CHANGE:
      return {
        ...state,
        priceMin: payload.priceMin,
        priceMax: payload.priceMax,
      };
    case ActionTypes.SIZE_RANGE_FILTER_CHANGE:
      return {
        ...state,
        sizeMin: payload.sizeMin,
        sizeMax: payload.sizeMax,
      };
    case ActionTypes.ADV_TYPE_CHANGED:
      return {
        ...state,
        advType: payload,
      };
    case ActionTypes.DUE_DATE_CHANGED:
      return {
        ...state,
        dueDate: payload,
      };

    case ActionTypes.REALTY_TYPES_SELECT_CHANGE:

      return {
        ...state,
        realtyTypesSelected: getRealtyTypesSelectChange(state, payload),
      };

    case ActionTypes.REALTY_TYPES_RESET:
      return {
        ...state,
        realtyTypesSelected: new Set(),
      };

    case ActionTypes.RESET_FILTERS:
      return {
        ...initialState,
        advType: state.advType,
      };
    default:
      return state;
  }
}

const getRealtyTypesSelectChange = (state, id) => {
  const selection = new Set(state.realtyTypesSelected);
  if (selection.has(id)) {
    selection.delete(id);
  } else {
    selection.add(id);
  }
  return selection;
};