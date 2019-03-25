/*****************
 * Drawer Styles *
 *****************/

import { DRAWER_WIDTH } from './style-variables';

export const headerStyles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  appBarWindowControl: {
    backgroundColor: theme.palette.primary.dark,
    minHeight: 25,
    justifyContent: 'flex-end',
  },
  appBarMainToolBar: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 50,
  },
  appBarWindowControlIcons: {
    padding: 3,
  },
  appBarWindowControlIconRotation: {
    transform: 'rotate(-90deg)',
  }
});
