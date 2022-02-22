import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  features: [],
};
export default function features(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.FEATURES_LOADED:
      return {
        ...state,
        features: payload,
      };
    default:
      return state;
  }
}
