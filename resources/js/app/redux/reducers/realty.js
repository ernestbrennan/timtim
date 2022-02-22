import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  options: {},
};
export default (state = initialState, { type, payload }) => {

  switch (type) {
    case ActionTypes.REALTY_OPTIONS_LOADED:
      return {
        ...state,
        options: payload,
      };

    default:
      return state;
  }
}
