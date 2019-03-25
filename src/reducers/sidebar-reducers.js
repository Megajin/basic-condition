/**********************************************************
 * All reducers which will be used for sidebar actions.   *
 **********************************************************/

/**
 * Depending on which element triggered this reducer,
 * it will change the given state.
 * @param  {Object}  [state={}] previous state.
 * @param  {String} action      defined action from action.
 * @return {Object}             returns new state.
 */
const sidebarReducers = (state = {}, action) => {
  // check which action was triggered.
  switch (action.type) {
  case 'SHOW_SIDEBAR': {
    return Object.assign({}, state, { open: action.open });
  }

  case 'HIDE_SIDEBAR': {
    return Object.assign({}, state, { open: action.open });
  }

  default: {
    return state;
  }
  }
};

export default sidebarReducers;
