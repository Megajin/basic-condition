/*********************************************
 * This file is mandantory                   *
 * if you want to show icons in the sidebar. *
 *********************************************/

import React, { PureComponent } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';

class DashboardSidebarIcon extends PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <DashboardIcon />
      </>
    );
  }

}

export default DashboardSidebarIcon;
