// All window relevant actions.
// Careful this one will use IPC as well.

import { ipcRenderer } from 'electron';

const WINDOW_IS_MAXIMAZED = 'WINDOW_IS_MAXIMAZED';
const WINDOW_IS_MINIMIZED = 'WINDOW_IS_MINIMIZED';
const WINDOW_WILL_UN_MAXIMAZED = 'WINDOW_WILL_UN_MAXIMAZED';
const WINDOW_WILL_CLOSE = 'WINDOW_WILL_CLOSE';

const _windowIsMaximazed = () => {
  return {
    type: WINDOW_IS_MAXIMAZED,
    windowIsMaximazed: true
  };
};

const _windowWillUnMaximazed = () => {
  return {
    type: WINDOW_WILL_UN_MAXIMAZED,
    windowIsMaximazed: false
  };
};

const _windowIsMinimized = () => {
  return {
    type: WINDOW_IS_MINIMIZED,
    windowIsMinimized: true
  };
};

const _windowWillClose = () => {
  return {
    type: WINDOW_WILL_CLOSE,
    windowWillClose: true
  };
};

/**
 * Does Change window state.
 * @param  {String} action Case to use
 * @return {Void}
 */
export const changeWindowState = action => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return async dispatch => {
    switch (action.toLowerCase()) {
    case 'maximize': {
      ipcRenderer.send('winMaximize');
      return dispatch(_windowIsMaximazed());
    }

    case 'unmaximize': {
      ipcRenderer.send('winUnmaximize');
      return dispatch(_windowWillUnMaximazed());
    }

    case 'minimize': {
      ipcRenderer.send('winMinimize');
      return dispatch(_windowIsMinimized());
    }

    case 'close': {
      ipcRenderer.send('close');
      return dispatch(_windowWillClose());
    }

    default: {
      return null;
    }
    }
  };
};
