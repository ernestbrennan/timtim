import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  options: {},
};
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [],
};

function app(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.OPTIONS_LOADED:
      return {
        ...state,
        options: payload,
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, app);
