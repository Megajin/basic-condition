/***************************************************
 * Every Reducer should be imported in here so the *
 * APP Store can use them all.                     *
 ***************************************************/

// Import all reducers.
import { combineReducers } from 'redux';

import sidebarReducers from './sidebar-reducers';
import tabReducers from './tab-reducers';
import screenReducers from './screens-reducers';
import windowReducers from './window-reducers';

// combine and export them.
export default combineReducers({
  sidebarReducers,
  tabReducers,
  screenReducers,
  windowReducers
});
