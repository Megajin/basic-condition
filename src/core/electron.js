/****************************************************
 * electron.js                                      *
 * Class which hold every Electron needed function. *
 ****************************************************/

import path from 'path';
import url from 'url';

import electron, { ipcMain } from 'electron';


/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/********************************
 * End Private Area for Module. *
 ********************************/

/**
 * Electron Specific stuff, you can see this as an ES6 Wrapper for electron.
 */
export const Electron = new class {

  /**
   * Instantiates Electronclass with necessary information.
   * Everything will be stored as Userspecific Data in the given Database and
   * will be returned from there. Data will be returned crypted.
   */
  constructor() {
    // this.userPreferences = this.getPreferences;
  }

  /** #################### APP CORRESPONDING EVENTS #################### **/

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

  /** ###################################################################### */

  /** #################### WINDOW CORRESPONDING EVENTS #################### **/

  /**
   * Will attach the closing event for the given window.
   * @private
   * @param  {Object} winObject Window Object from app.
   */
  _registerWindowCloseEvent(winObject) {
    // Emitted when the window is closed.
    winObject.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      winObject = null;
    });
  }

  /** ####################################################################   */

  /**
   * Creating an electron app object.
   * @return {Object} Electron App Object.
   */
  createApp() {
    // Promisify function.
    return new Promise((resolve, reject) => {
      try {
        // Instantiate App from electron.
        let { app } = electron;

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        return app.on('ready', () => {
          // register all necessary events.
          this._registerAppCloseEvent(app);

          // resolve promise.
          return resolve();
        });
      } catch (e) {
        //Logg Error Message.

        return reject({
          funcName: this.constructor.name + '.' + this.createApp.name,
          message: 'Promise was',
          optInfo: 'rejected'
        });
      }
    });
  }

  /**
   * Opens up a new loading window.
   * @public
   * @param  {Anything}  winObject    window Object is needed as global reference from outside of this function.
   *                                  if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
   * @param  {String}    pathToOpen   Path which will be loaded into new window. From project dir!
   * @param  {Booleab}   pathProtocol Begins with http, https, ftp, gopher, or file.
   * @param  {Object}    [winOptions] Can be any of the normal electron window options: https://electron.atom.io/docs/api/browser-window/#class-browserwindow.
   */
  createWindow(winObject, pathToOpen, pathProtocol, winOptions) {
    try {
      // Check mandantory parameters.
      if (pathToOpen == null || typeof pathToOpen !== 'string') throw new TypeError('in Parameter: \' pathToOpen \' ');
      if (pathProtocol == null || typeof pathProtocol !== 'string') throw new TypeError('in Parameter: \' pathProtocol \' ');

      // Check default parameters.
      if (winOptions == null || typeof winOptions !== 'object') winOptions = {};
      if (winOptions.show == null) winOptions.show = false;

      // Create the browser window.
      let { BrowserWindow } = electron;

      // // add some security options.
      // winOptions.webPreferences = {
      //   nodeIntegration: true,
      //   contextIsolation: true,
      //   webviewTag: true
      // };

      winObject = new BrowserWindow(winOptions);

      // and load given path.
      winObject.loadURL(
        url.format({
          pathname: path.join(___approot, pathToOpen),
          protocol: pathProtocol,
          slashes: true
        })
      );

      winObject.webContents.openDevTools();

      ipcMain.on('winMaximize', () => winObject.maximize());
      ipcMain.on('winUnmaximize', () => winObject.unmaximize());
      ipcMain.on('winMinimize', () => winObject.minimize());

      ipcMain.on('close', () => winObject.close());

      // If window is ready show it.
      winObject.once('ready-to-show', () => {
        winObject.show();
        // register events.
        this._registerWindowCloseEvent(winObject);
      });


    } catch (e) {
      //Logg Error Message.
      console.log(e);
    }
  }

}();
