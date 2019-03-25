import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from './assets/theme/mui-theme';

import { configureStore } from './configure-store';

import Screens from './client-screens';


/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/*****************************
 * DEFINE GLOBALS FOR APP    *
 * @NOTE: DO NOT ABUSE THIS. *
 *****************************/

/*****************************
 * ######################    *
 *****************************/

/**
 * Creates Store for Redux Pattern.
 * Only use one store for the whole app!
 * defines state values.
 * define store with all reducers needed for the app.
 * so basically every single one under ./reducers/*.
 * @type {Store}
 */
const Store = configureStore();

/********************************
 * End Private Area for Module. *
 ********************************/

class ClientRoot extends Component {

  /**
   * Constructor of Client class.
   * @param {Object} props react Props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <MuiThemeProvider theme={theme}>
          <Screens />
        </MuiThemeProvider>
      </Provider>
    );
  }

}

render(
  <ClientRoot />,
  document.getElementById('client-root')
);
