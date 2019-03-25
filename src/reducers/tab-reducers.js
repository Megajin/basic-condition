/*****************************************************
 * All reducers which will be used for api actions.  *
 *****************************************************/

/**
 * Depending on which element triggered this reducer,
 * it will change the given state.
 * @param  {Object}  [state={}] previous state.
 * @param  {String} action      defined action from action.
 * @return {Object}             returns new state.
 */
const tabReducers = (state = {}, action) => {
  // check which action was triggered.
  switch (action.type) {
  case 'TAB_CHANGE': {
    return Object.assign({}, state, { activeTab: { [action.id]: action.value } });
  }

  default: {
    return state;
  }
  }
};

export default tabReducers;
