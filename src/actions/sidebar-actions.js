/**************************
 * Actions for sidebar    *
 **************************/

/***********************************************************
 * All relevant Actions for Texts will be sotred in here.  *
 ***********************************************************/

/**
 * Action Types.
 */

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';
export const SHOW_LIST = 'SHOW_LIST';
export const HIDE_LIST = 'HIDE_LIST';

/**
 * ############################################################################
 */

/**
 * Action Constants.
 */

/**
 * ############################################################################
 */

/**
 * Synchronous Action Creators.
 */

const _showSidebar = () => {
  return {
    type: SHOW_SIDEBAR,
    open: true
  };
};

const _hideSidebar = () => {
  return {
    type: HIDE_SIDEBAR,
    open: false
  };
};

/**
 * ############################################################################
 */

/**
 * Asynchronous Action Creators.
 */

/**
 * Shows or closes Sidebar.
 * @param  {Boolean} open true/false
 * @return {Void}
 */
export const showHideSidebar = open => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return async dispatch => {
    // tell the frontend that we are doing something asynchronous.
    if (open === true) {
      dispatch(_hideSidebar());
    } else {
      dispatch(_showSidebar());
    }
  };
};

/**

 /**
  * ############################################################################
  */
