/*********************
 * Header Component. *
 *                   *
 *********************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import MinimizeIcon from '@material-ui/icons/FirstPage';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { headerStyles } from '../../../assets/styles/header-styles';

import { showHideSidebar } from '../../../actions/sidebar-actions';
import { changeWindowState } from '../../../actions/window-actions';

/**
 * Header Component which will control the sidebar as well.
 * @extends Component
 */
class Header extends Component {

  /**
   * Define Props for Component.
   * @type {Object}
   */
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      showHideSidebar: PropTypes.func.isRequired,
      changeWindowState: PropTypes.func.isRequired,
      sideBarOpen: PropTypes.bool,
      windowState: PropTypes.object
    };
  }

  /**
   * Specifies the default values for props of Component.
   * @type {Object}
   */
  static get defaultProps() {
    return {
      sideBarOpen: false,
      windowState: null
    };
  }

  /**
   * If this argument is specified, the new component will subscribe to Redux store updates.
   * This means that any time the store is updated, mapStateToProps will be called.
   * The results of mapStateToProps must be a plain object,
   * which will be merged into the component’s props. If you don't want to subscribe to store updates,
   * pass null or undefined in place of mapStateToProps.
   *
   * @NOTE: BE CAREFUL WITH secureTextEntry + keyboardType!
   * If you use it with 'email-adress' the context will not be secured!!!
   * @see https://github.com/facebook/react-native/issues/10678
   *
   * @param  {Object} state    Reducer returned state.
   * @param  {Object} ownProps Props passed from parent to this component.
   * @see                      https://github.com/reduxjs/react-redux/blob/master/docs/api.md
   * @return {Object}          this.props with sate and ownprops.
   */
  static mapStateToProps(state, ownProps) {
    const { sidebarReducers, setupReducers, windowReducers } = state;

    // merge into current props.
    return {
      ...ownProps,
      setupIsOk: setupReducers ? setupReducers.isComplete : false,
      sideBarOpen: sidebarReducers ? sidebarReducers.open : false,
      windowState: windowReducers.windowState
    };
  }

  /**
   * Your mapDispatchToProps function should return a plain object:
   * Each field in the object will become a separate prop for your own component,
   * and the value should normally be a function that dispatches an action when called.
   * If you use action creators ( as oppose to plain object actions ) inside dispatch,
   * it is a convention to simply name the field key the same name as the action creato
   * @param  {function} dispatch dispatch from redux.
   * @return {Object}            this.props with dispatch actions in props.
   */
  static mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        showHideSidebar,
        changeWindowState
      },
      dispatch
    );
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { sideBarOpen, windowState, showHideSidebar, changeWindowState, classes } = this.props;
    return (
      <div>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: sideBarOpen
          })}
        >
          <Toolbar className={classNames(classes.appBarWindowControl)} disableGutters>
            <IconButton color="inherit" onClick={() => changeWindowState('minimize')} className={classNames(classes.toolBarButtonsClose, classes.appBarWindowControlIcons, classes.appBarWindowControlIconRotation)}>
              <MinimizeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => changeWindowState(windowState && windowState.windowIsMaximazed === true ? 'unmaximize' : 'maximize')} className={classNames(classes.toolBarButtonsClose, classes.appBarWindowControlIcons)}>
              {windowState != null && windowState.windowIsMaximazed === true ? <FullscreenExitIcon /> : <FullscreenIcon /> }
            </IconButton>
            <IconButton color="inherit" onClick={() => changeWindowState('close')} className={classNames(classes.toolBarButtonsClose, classes.appBarWindowControlIcons)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Toolbar disableGutters={!sideBarOpen} className={classNames(classes.appBarMainToolBar)}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => showHideSidebar(sideBarOpen)}
              className={classNames(classes.menuButton, {
                [classes.hide]: sideBarOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {'Client Header'}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

/**
 * Export Component as Redux Container.
 */
export default connect(
  Header.mapStateToProps,
  Header.mapDispatchToProps
)(withStyles(headerStyles, { withTheme: true })(Header));
