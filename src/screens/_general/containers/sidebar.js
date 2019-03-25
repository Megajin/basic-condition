/**********************
 * Sidebar Component. *
 *********************/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BrokenImage from '@material-ui/icons/BrokenImage';

import { showHideSidebar } from '../../../actions/sidebar-actions';
import { drawerStyles } from '../../../assets/styles/drawer-styles';

class Sidebar extends PureComponent {

  /**
   * Define Props for Component.
   * @type {Object}
   */
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      showHideSidebar: PropTypes.func.isRequired,
      sidebarList: PropTypes.array.isRequired,
      sideBarOpen: PropTypes.bool
    };
  }

  /**
   * Specifies the default values for props of Component.
   * @type {Object}
   */
  static get defaultProps() {
    return {
      sideBarOpen: false
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
    const { sidebarReducers } = state;

    // merge into current props.
    return {
      ...ownProps,
      sideBarOpen: sidebarReducers ? sidebarReducers.open : false
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
        showHideSidebar
      },
      dispatch
    );
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { sideBarOpen, showHideSidebar, sidebarList, classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: sideBarOpen,
          [classes.drawerClose]: !sideBarOpen
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: sideBarOpen,
            [classes.drawerClose]: !sideBarOpen
          })
        }}
        open={sideBarOpen}
      >
        <div className={classes.toolbar}>
          <h4>Menu</h4>
          <IconButton onClick={() => showHideSidebar(sideBarOpen)}>{sideBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </div>
        <Divider />
        <List>
          {sidebarList.map(sidebarItem => (
            <Link to={sidebarItem.linkTo} key={sidebarItem.id}>
              <ListItem button>
                <ListItemIcon>{sidebarItem.component ? <sidebarItem.component /> : <BrokenImage />}</ListItemIcon>
                <ListItemText primary={sidebarItem.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    );
  }

}
/**
 * Export Component as Redux Container.
 */
export default connect(
  Sidebar.mapStateToProps,
  Sidebar.mapDispatchToProps
)(withStyles(drawerStyles, { withTheme: true })(Sidebar));
