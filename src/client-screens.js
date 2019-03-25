/****************************************************
 * Screen class                                     *
 * This class will hold all routes,                 *
 * keep in mind to set the routes like screens.       *
 * so if a page has a child screens then place it     *
 * under the call of the parent page.               *
 * Keep it readable.                                *
 *                                                  *
 * NOTE: THIS CLASS MUST BE LOADED INTO *-Root.js!  *
 ****************************************************/

import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './screens/_general/containers/header';
import Footer from './screens/_general/containers/footer';
import Sidebar from './screens/_general/containers/sidebar';

import { MainStyles } from './assets/styles/main-styles';

import { screensCollector } from './actions/screens-actions';

/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/*******************************
 * End Private Area for Module. *
 ********************************/

/**
 * Holds the screens of the site.
 * @type {Object}
 */
class ClientScreens extends Component {

  /**
   * Define Props for Component.
   * @type {Object}
   */
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      screensCollector: PropTypes.func.isRequired,
      snack: PropTypes.object,
      screens: PropTypes.object
    };
  }

  /**
   * Specifies the default values for props of Component.
   * @type {Object}
   */
  static get defaultProps() {
    return {
      snack: null,
      screens: null,
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
    const { snackbarReducers, screenReducers } = state;

    // merge into current props.
    return {
      ...ownProps,
      snack: snackbarReducers ? snackbarReducers.snack : null,
      screens: screenReducers ? screenReducers.screens : null,
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
        screensCollector,
      },
      dispatch
    );
  }

  /**
   * Constructor of Client class.
   * @param {Object} props react Props
   */
  constructor(props) {
    super(props);
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted.
   * Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint,
   * this is a good place to instantiate the network request.
   * @return {void}
   */
  async componentDidMount() {
    const { screensCollector } = this.props;
    await screensCollector();
  }

  /**
   * componentDidUpdate() is invoked immediately after updating occurs.
   * This method is not called for the initial render.
   *
   * Use this as an opportunity to operate on the DOM when the component has been updated.
   * This is also a good place to do network requests as long as you compare the current
   * props to previous props (e.g. a network request may not be necessary if the props have not changed).
   *
   * You may call setState() immediately in componentDidUpdate() but note that it must be wrapped
   * in a condition like in the example above, or you’ll cause an infinite loop. It would also cause
   * an extra re-rendering which, while not visible to the user, can affect the component performance.
   * If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead. Read more about why copying props into state causes bugs.
   *
   * If your component implements the getSnapshotBeforeUpdate() lifecycle (which is rare),
   * the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate().
   * Otherwise this parameter will be undefined.
   *
   * componentDidUpdate() will not be invoked if shouldComponentUpdate() returns false.
   *
   * @see https://reactjs.org/docs/react-component.html#componentdidupdate
   * @param  {Object} prevProps previous props.
   * @param  {Object} prevState previous state.
   * @param  {Object} snapshot  only available if used in lifecycle.
   * @return {void}
   */
  async componentDidUpdate(/**prevProps   prevState, snapshot */) {}

  /**
   * React Render Method.
   * @return {void}
   */
  render() {
    // destruct all needed props.
    const { snack, screens, classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        {screens === null ? null : (
          <Router>
            <Sidebar sidebarList={screens.sidebarList} />
          </Router>
        )}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {screens === null ? (
            <CircularProgress />
          ) : (
            <Router>
              <div>
                {screens.screensList.map(screen => {
                  return (
                    <Route
                      exact
                      key={screen.id}
                      path={screen.linkTo}
                      render={params => {
                        return <screen.component {...params} />;
                      }}
                    />
                  );
                })}
              </div>
            </Router>
          )}
        </main>
        <Footer />
      </div>
    );
  }

}

/**
 * Export Component as Redux Container.
 */
export default connect(
  ClientScreens.mapStateToProps,
  ClientScreens.mapDispatchToProps
)(withStyles(MainStyles, { withTheme: true })(ClientScreens));
