import * as ActionTypes from './actionTypes';

export function onAuthRequested() {
  return {
    type: ActionTypes.AUTH_REQUESTED,
  };
}

export function onAuthRequestCanceled() {
  return {
    type: ActionTypes.AUTH_REQUEST_CANCELED,
  };
}

export function onAuthSuccess() {
  return {
    type: ActionTypes.AUTH_SUCCESS,
  };
}

export function onAuthLogout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
}

export function getSetAnonymousLoginToken(userCredential) {
  return {
    type: ActionTypes.SET_ANONYMOUS_LOGIN_TOKEN,
    payload: userCredential,
  };
}
