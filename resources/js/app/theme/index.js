import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({

  palette: {
    primary: {
      gradient: 'linear-gradient(180deg, #34AEE1 0%, #019CDE 100%)',
      main: 'rgb(82, 172,220)',
      white: '#FFF',
      buttonBackgroundGrey: '#f3f3f3',
      lightText: '#54606A',

      lightGrey: '#EDEDED',
      darkGrey: '#7C7C7C',
      grey: '#9B9B9B',

      textColor: '#595959',
    },
    secondary: {
      main: '#2C74A8',
      gray: '#7B7B7B',

      textColor: '#787878',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontSize: 36,
      fontWeight: 500,
      letterSpacing: 'inherit',
      lineHeight: 'inherit',
    },
    h2: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 'inherit',
      lineHeight: 'inherit',
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 'inherit',
      lineHeight: 'inherit',
    },
  },
  overrides: {
    MuiAppBar: {

    },
    MuiBackdrop: {
      root: {
        background: 'linear-gradient(180deg, #34AEE1 0%, #019CDE 100%)',
        opacity: '0.7 !important',
      },
    },
    MuiIconButton: {
      root: {
        '&[variant=outlined]': {
          border: '1px solid currentColor !important'
        }
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      outlined: {
        border: '1px solid currentColor !important'
      },
    }
  },
});

export default theme;
