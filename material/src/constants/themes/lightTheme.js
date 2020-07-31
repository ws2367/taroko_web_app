import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#5124EF',
      dark: "#5124EF", // Cooby color: same as chip text
      contrastText: '#fff',
    },
    secondary: {
      main: "#5124EF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    // error: will use the default color
  }
});

export default theme;
