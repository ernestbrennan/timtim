import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  isAuthRequestStared: false,
  isAuthRequestSent: false,
  isAuthenticated: false,
  user: {},
};
export default function auth(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.AUTH_REQUESTED:
      return {
        ...state,
        isAuthRequestStared: true,
      };
    case ActionTypes.AUTH_REQUEST_CANCELED:
      return {
        ...state,
        isAuthRequestStared: false,
      };
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuthRequestStared: false,
        isAuthRequestSent: false,
        isAuthenticated: true,
      };
    case ActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isAuthRequestStared: false,
        isAuthRequestSent: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
