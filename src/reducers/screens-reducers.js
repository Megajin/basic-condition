/**********************************************************
 * All reducers which will be used for screens  actions.  *
 **********************************************************/

/**
 * Depending on which element triggered this reducer,
 * it will change the given state.
 * @param  {Object}  [state={}] previous state.
 * @param  {String} action      defined action from action.
 * @return {Object}             returns new state.
 */
const screenReducers = (state = {}, action) => {
  // check which action was triggered.
  switch (action.type) {
  case 'SCREENS_FETCHING': {
    return Object.assign({}, state, { screens: { isFetching: action.isFetching } });
  }

  case 'SCREENS_LOADED': {
    return Object.assign({}, state, { screens: { isFetching: action.isFetching, isError: action.isError, error: action.error, ...action.payload } });
  }

  case 'SCREENS_ERROR': {
    return Object.assign({}, state, { screens: { isFetching: action.isFetching, isError: action.isError, error: action.error } });
  }

  default: {
    return state;
  }
  }
};

export default screenReducers;
