# basic-condition

This repository will show you some brief examples on code quality

# Styleguide

To keep everything simple and clean the `eslintrc` is included.
Keep in mind to use an auto formatter which allow to use eslint like `prettier` for atom.

# Comments

Do not abuse comments. However every function should be descriped with the needed tags from [ESDoc](https://esdoc.org/)

For example:
```jsx
  /**
   * Will attach the closing event for the given app object.
   * @private
   * @param  {Object} appObject Electron App Object.
   */
  _registerAppCloseEvent(appObject) {
    // Quit when all windows are closed.
    appObject.on('window-all-closed', () => {
      appObject.quit();
    });
  }
```

# ReactJS / JavaScript

Avoid functional components! Uses Classes for all react components and if needed extend the `class` as a `PureComponent` instead of `component`.

Example:

```jsx
import React, { PureComponent } from 'react';
import SettingsIcon from 'mdi-material-ui/Settings';

class SettingsSidebarIcon extends PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <SettingsIcon />
      </>
    );
  }

}

export default SettingsSidebarIcon;
```

**Do not make FAT Components, better split a component if it gets too big.**

whenever a function should not be called outside of its class declare it with a underscore: `_fakePrivateFunction()`.

## Screens in React Router

keep everything clean and simple. Generate a folder with the name and position id of the Screen e.g. `3-profile`. This Folder schould contain an `index.js` and a `icon.js`. Every sub screen should have its own folder with its own components in it.

However multiple used components can be stored under `screens/_general/...`

# Redux

Split actions and reducers in different files. Never use the classic react state like `this.state` or `this.setState()`.

## Actions

Actions should always be simple functions:
```jsx
// Multi Screen Constants
const SCREENS_FETCHING = 'SCREENS_FETCHING';

// multi screens sync actions.
const _screensFetching = () => {
  return {
    type: SCREENS_FETCHING,
    isFetching: true
  };
};
```

As well as the async actions:
```jsx
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
```

## Reducers

Reducers should always be `switch cases`.

```jsx
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
```

after that you should include all reducers like this:

```jsx
// Import all reducers.
import { combineReducers } from 'redux';

import sidebarReducers from './sidebar-reducers';
import tabReducers from './tab-reducers';

// combine and export them.
export default combineReducers({
  sidebarReducers,
  tabReducers,
});
```

# Styles

All styles all mainly oriented on the [material-ui](https://material-ui.com/getting-started/installation/). Avoid using normal css. instead use style `JavaScript` files:

```jsx
export const MainStyles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
});
```
 on top of that a theme must be defined as well:

 ```jsx
 import { createMuiTheme } from '@material-ui/core/styles';

 export const theme = createMuiTheme({
   palette: {
     primary: {
       light: '#8eacbb',
       main: '#607d8b',
       dark: '#34515e',
       contrastText: '#fafafa',
     },
     secondary: {
       light: '#bef67a',
       main: '#8bc34a',
       dark: '#5a9216',
       contrastText: '#fafafa',
     },
   },
   typography: {
     useNextVariants: true
   }
 });
 ```

The Icons used are from the [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) package. They are included like normal react components. A cheatsheet can be found here: [Material Design Icons](https://cdn.materialdesignicons.com/3.5.95/).

# everything else
 Feel free to look into all files in this repository.
