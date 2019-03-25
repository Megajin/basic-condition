/*********************************
 * Configuraton for Redux Store  *
 * plus some Gimmicks.           *
 *********************************/

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import rootReducers from './reducers';

// const loggerMiddleware = createLogger();

export const configureStore = () => {
  return createStore(
    rootReducers,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      // loggerMiddleware // neat middleware that logs actions
    ));
};
