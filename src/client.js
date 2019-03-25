/****************************************************
 * Client class                                     *
 * is meant to be a layout for later use in routing *
 * where this class holds header and footer.        *
 *                                                  *
 * NOTE: THIS CLASS MUST BE LOADED INTO *-Pages.js! *
 ****************************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from './screens/_general/containers/header';
import Footer from './screens/_general/containers/footer';

/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/*******************************
 * End Private Area for Module. *
 ********************************/

/**
 * Client Class which will hold header and footer,
 * as an layout for later use on routing.
 */
class Client extends Component {

  /**
   * Define Props for Component.
   * @type {Object}
   */
  static get propTypes() {
    return {
      children: PropTypes.element.isRequired
    };
  }

  /**
   * Specifies the default values for props of Component.
   * @type {Object}
   */
  static get defaultProps() {
    return {};
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
    // merge into current props.
    return Object.assign({}, ownProps, state);
  }

  /**
   * This is considered best practice to pass mergeProps to connect so we can merge our state props with own props.
   * @param  {Object} stateProps    Reducer returned state.
   * @param  {Object} dispatchProps Props dispatched from actions.
   * @param  {Object} ownProps      Props passed from parent to this component.
   * @see                           https://github.com/reduxjs/react-redux/issues/324
   * @return {Object}               this.props with sate and ownprops.
   */
  static mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ...ownProps, ...stateProps);
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
  async componentDidMount() {}

  /**
   * React Render Method.
   * @return {void}
   */
  render() {
    // destruct all needed props.
    const { children } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Paper square elevation={2}>
            <Footer />
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

export default Client;
