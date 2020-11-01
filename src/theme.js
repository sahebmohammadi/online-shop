import { createMuiTheme} from '@material-ui/core/styles';
const theme = createMuiTheme({
  // direction: 'rtl',
  palette: {
    primary: {
      main: '#052971',
    },
    secondary: {
      main: '#979797',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: ['Shabnam', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
      ',',
    ),
  },
});

export default theme;
