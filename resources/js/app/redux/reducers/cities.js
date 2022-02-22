import * as ActionTypes from '../actions/actionTypes';
import { selectCityById } from '../selectors/selectors';

const initialState = {
  cities: [],
  currentCityId: null,
  currentCity: {},
};
export default function cities(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.CITIES_LOADED:
      return {
        ...state,
        cities: payload,
      };
    case ActionTypes.CITY_CHANGED:
      return {
        ...state,
        currentCityId: payload,
        currentCity: state.cities.length > 0 ? selectCityById(payload, state.cities) : {},
      };
    default:
      return state;
  }
}
