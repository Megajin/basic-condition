/************************
 * Settings Component.  *
 ************************/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { SettingsStyle } from '../../assets/styles/settings-style';

/**********************************
 * Begin Private Area for Module. *
 **********************************/

// @NOTE: This Section is shared through every Instance of this given class.
// - You have been warned. -

/*******************************
 * End Private Area for Module. *
 ********************************/

/**
 * Initial Site and the Dashboard
 * will hold all needed informations.
 */
class Settings extends Component {

  /**
   * Specifies the default values for props of Component.
   * @type {Object}
   */
  static get defaultProps() {
    return {
      inputReducers: null
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography letiant="h6" color="inherit" noWrap>
            {'API - KEY '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="api-key" label="api-key" margin="normal" letiant="standard" onBlur={e => console.log(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    );
  }

}

/**
 * Export Component as Redux Container.
 */
export default withStyles(SettingsStyle, { withTheme: true })(Settings);
