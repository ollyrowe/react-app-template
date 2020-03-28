import { createMuiTheme } from '@material-ui/core/styles';

/**
 * The Application theme.
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0052CC'
    },
    secondary: {
      main: '#FFFFFF'
    },
    text: { main: '#000000de' },
    error: { main: '#FF5630' },
    background: {
      main: '#F4F5F7',
      light: '#FFFFFF',
      dark: '#172B4D'
    }
  },
  typography: {
    h1: {
      fontSize: '1.8em'
    },
    h2: {
      fontSize: '1.5em'
    },
    h4: {
      fontSize: '1.2em'
    },
    h5: {
      fontSize: '1.5em'
    },
    body2: {
      fontSize: '1em'
    }
  }
});
