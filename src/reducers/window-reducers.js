/********************************************************
 * All reducers which will be used for window actions.  *
 ********************************************************/

/**
 * Depending on which element triggered this reducer,
 * it will change the given state.
 * @param  {Object}  [state={}] previous state.
 * @param  {String} action      defined action from action.
 * @return {Object}             returns new state.
 */
const windowReducers = (state = {}, action) => {
  // check which action was triggered.
  switch (action.type) {
  case 'WINDOW_IS_MAXIMAZED': {
    console.log(state);
    return Object.assign({}, state, { windowState: { windowIsMaximazed: action.windowIsMaximazed } });
  }

  case 'WINDOW_IS_MINIMIZED': {
    return Object.assign({}, state, { windowState: { windowIsMinimized: action.windowIsMinimized } });
  }

  case 'WINDOW_WILL_UN_MAXIMAZED': {
    return Object.assign({}, state, { windowState: { windowIsMaximazed: action.windowIsMaximazed } });
  }

  case 'WINDOW_WILL_CLOSE': {
    return Object.assign({}, state, { windowState: { windowWillClose: action.windowWillClose } });
  }

  default: {
    return state;
  }
  }
};

export default windowReducers;
