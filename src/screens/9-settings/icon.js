/*********************************************
 * This file is mandantory                   *
 * if you want to show icons in the sidebar. *
 *********************************************/

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
