import * as ActionTypes from './actionTypes';

export function loadOptions() {
  return {type: ActionTypes.LOAD_OPTIONS};
}
export function optionsLoaded(results) {
  return {type: ActionTypes.OPTIONS_LOADED, payload: results};
}

