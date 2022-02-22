import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  data: [],
};

export default function residentialComplexes(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.RESIDENTIAL_COMPLEXES_LOADED: {
      return {
        ...state,
        data: payload,
      };
    }
    default: {
      return state;
    }
  }
}
