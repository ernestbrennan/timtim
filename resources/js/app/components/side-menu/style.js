import {makeStyles} from "@material-ui/core";
import {darken} from "@material-ui/core/styles";

const menuItemStyle = {
  listStyle: 'none',
  fontWeight: 500,
  fontSize: 14,

  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: '#555',
    textDecoration: 'underline',
  },
};
export default makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    boxSizing: 'border-box',
    width: 450,
    padding: '16px 32px 32px 60px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      overflowY: 'auto',
    },
  },
  menu: {
    margin: '6px 0',
    paddingLeft: 0,
  },
  menuItem: {
    ...menuItemStyle,
    margin: '10px 0',
    color: theme.palette.primary.textColor,
  },
  smallMenuItem: {
    ...menuItemStyle,
    margin: '10px 0',
    color: theme.palette.primary.textColor,
    fontWeight: 300,
    fontSize: 14,
  },
  social: {
    margin: '10px 0',
  },
  link: {
    color: theme.palette.secondary.contrastText,
    fontSize: 14,
    fontWeight: 300,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  closeBtn: {
    position: 'absolute',
    top: 36,
    left: 0,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  spacer: {
    height: 1,
  },
  appIconsContainer: {
    display: 'flex',
  },
  appIconBtn: {
    width: 130,
    height: 40,
    fontSize: 12,
    borderRadius: 5,
    padding: 12
  },
  googleBtn: {
    marginRight: 10,
    background: theme.palette.primary.main,
    color: theme.palette.primary.white,
    '&:hover': {
      background: theme.palette.primary.main,
    }
  },
  appleBtn: {
    background: 'transparent',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main
  },
}));


