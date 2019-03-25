# basic-condition
This repository will show you some brief examples on code quality
---

# Styleguide
---
To keep everything simple and clean the `eslintrc` is included.
Keep in mind to use an auto formatter which allow to use eslint like `prettier` for atom.

# Comments
---

Do not abuse comments. However every function should be descriped with the needed tags from [ESDoc](https://esdoc.org/)

For example:
```
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
---
