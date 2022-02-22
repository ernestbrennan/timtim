import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  app: {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.white,
    padding: '80px 0 64px 0',
    borderRadius: '8px',
    marginBottom: '8px',
    [theme.breakpoints.down('md')]: {
      padding: '32px 0 32px 0',
      minHeight: `unset`,
    },
  },
  padding: {
    width: '100%',
    maxWidth: '1408px',
    paddingLeft: '16px',
    paddingRight: '16px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '144px',
      paddingRight: '144px',
    },
  },
  noTopBorderRadius: {
    borderTopLeftRadius: 'unset',
    borderTopRightRadius: 'unset',
  },
  img: {
    width: '100%', height: 'auto',
  },
  iconBtn: {
    width: 200,
    height: 40,
    fontSize: 12,
    borderRadius: 5,
    padding: 12
  },
  googleBtn: {
    background: theme.palette.primary.white,
    '&:hover': {
      background: theme.palette.primary.white,
    }
  },
  appleBtn: {
    background: 'transparent',
    border: '1px solid',
    borderColor: theme.palette.primary.white,
    color: theme.palette.primary.white
  },
}));


