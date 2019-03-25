/***************************************
 * Theme Design                        *
 ***************************************/

import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8eacbb',
      main: '#607d8b',
      dark: '#34515e',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#bef67a',
      main: '#8bc34a',
      dark: '#5a9216',
      contrastText: '#fafafa',
    },
  },
  typography: {
    useNextVariants: true
  }
});
