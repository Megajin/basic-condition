/************************
 * Dashboard Component. *
 ************************/

/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/*******************************
 * End Private Area for Module. *
 ********************************/

import React, { Component } from 'react';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


/**
 * Initial Site and the Dashboard
 * will hold all needed informations.
 */
class Dasboard extends Component {

  render() {

    return (
      <Grid container>
        <Grid item xs={12} id="demo-content">
          <Typography letiant="h6" color="inherit" noWrap>
            {'Dashboard '}
          </Typography>
        </Grid>
      </Grid>
    );
  }

}

/**
 * Export Component as Redux Container.
 */
export default connect(
  Dasboard.mapStateToProps,
  Dasboard.mapDispatchToProps
)(Dasboard);
