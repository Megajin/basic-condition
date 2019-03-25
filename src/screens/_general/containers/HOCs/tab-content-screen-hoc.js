/*****************************************
 * This HOC will produce a standard view *
 * with tabs to change the content.      *
 *****************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { contentStyles } from '../../../../assets/styles/content-styles';

import { changeTab } from '../../../../actions/tab-actions';

class TabContentScreenHOC extends Component {

  /**
   * Define Props for Component.
   * @type {Object}
   */
  static get propTypes() {
    return {
      tabList: PropTypes.array.isRequired,
      heading: PropTypes.string.isRequired,
      childName: PropTypes.string.isRequired,
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
      changeTab: PropTypes.func.isRequired,
      children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
      headingVariant: PropTypes.string,
      activeTab: PropTypes.object
    };
  }

  /**
   * Specifies the default values for props of Component.
   * @type {Object}
   */
  static get defaultProps() {
    return {
      activeTab: null,
      headingVariant: 'h5'
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
    const { tabReducers } = state;
    // merge into current props.
    return {
      ...ownProps,
      activeTab: tabReducers.activeTab
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
    return bindActionCreators({ changeTab }, dispatch);
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { activeTab, tabList, childName, heading, headingVariant, children, changeTab, theme } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Tabs key={`tabContainer-${childName}`} value={activeTab && activeTab[childName] ? activeTab[childName] : 0} onChange={(cl, i) => changeTab(childName, i)}>
            {tabList.map(t => (
              <Tab key={t.id} label={t.label} />
            ))}
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <br />
          <Typography variant={headingVariant}>{heading}</Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={activeTab ? activeTab[childName] : 0}>
            {children}
          </SwipeableViews>
        </Grid>
      </Grid>
    );
  }

}

/**
 * Export Component as Redux Container.
 */
export default connect(
  TabContentScreenHOC.mapStateToProps,
  TabContentScreenHOC.mapDispatchToProps
)(withStyles(contentStyles, { withTheme: true })(TabContentScreenHOC));
