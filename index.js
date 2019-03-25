/*********************************
 * Will start Software.          *
 * @author Güney Jung            *
 *********************************/

import path from 'path';

import { Electron } from './src/core/electron';

// Set root path globally.
global.___approot = path.resolve(__dirname);

/**
 * Entry Point.
 */
// eslint-disable-next-line
const Client = new class {
  constructor() {
    this.elWin = {};

    this.startClient();
  }

  startClient() {
    Electron.createApp()
    .catch(err => console.log(err))
    .then(() => {
      // Define Options for Window object.
      let windowOptions = {
        width: 1200,
        height: 800,
        frame: false
        // titleBarStyle: 'hidden'
      };

      // Create Window for electronjs.
      Electron.createWindow(this.elWin, './index.html', 'file:', windowOptions);
    });
  }

}();
