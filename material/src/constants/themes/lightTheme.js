import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#5124EF',
      dark: "#190078", // Cooby color: same as chip text 
      contrastText: '#fff',
    },
    secondary: {
      main: "#7F22FD",
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    // error: will use the default color
  }
});

export default theme;
