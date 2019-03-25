/*******************************************
 * Will help to dynamically import Screens *
 * and handle their actions.               *
 *******************************************/

// Glob for all Screens under screen.
import * as Screens from '../screens/**/index.js'; // eslint-disable-line
import * as Icons from '../screens/**/icon.js'; // eslint-disable-line

// Multi Screen Constants
const SCREENS_FETCHING = 'SCREENS_FETCHING';
const SCREENS_LOADED = 'SCREENS_LOADED';
const SCREENS_ERROR = 'SCREENS_ERROR';

// multi screens sync actions.
const _screensFetching = () => {
  return {
    type: SCREENS_FETCHING,
    isFetching: true
  };
};

const _screensLoaded = (screensList, sidebarList) => {
  return {
    type: SCREENS_LOADED,
    isFetching: false,
    isError: false,
    error: null,
    payload: { screensList, sidebarList }
  };
};

const _screensError = error => {
  return {
    type: SCREENS_ERROR,
    isFetching: false,
    isError: true,
    error
  };
};

// multiscreen Async actions

/**
 * Collects all screens under Screen folder and returns them so the front end can show them.
 * @return {Void}
 */
export const screensCollector = () => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return async dispatch => {
    dispatch(_screensFetching());
    try {
      let screenList = [];
      let sidebarList = [];
      const ScreenNames = Object.keys(Screens.default);

      return ScreenNames.map(sn => {
        screenList.push({
          id: `screen-id-${sn}`,
          name: sn,
          component: Screens[sn].default,
          linkTo: `${sn === 'dashboard' ? '/' : `/${sn}`}`
        });
        sidebarList.push({
          id: `sidebar-screen-icon-${sn}`,
          name: sn,
          component: Icons[sn] ? Icons[sn].default : null,
          linkTo: `${sn === 'dashboard' ? '/' : `/${sn}`}`
        });

        return dispatch(_screensLoaded(screenList, sidebarList));
      });
    } catch (e) {
      return dispatch(_screensError(e));
    }
  };
};
