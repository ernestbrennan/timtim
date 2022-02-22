import { combineReducers } from 'redux';
import cities from './cities';
import realty from './realty';
import search from './search';
import ui from './ui';
import filters from './filters';
import features from './features';
import auth from './auth';
import residentialComplexes from './residentialComplexes';

export default combineReducers({
  cities,
  realty,
  search,
  ui,
  filters,
  features,
  auth,
  residentialComplexes,
});
