import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  wrapper: {
    paddingTop: 72,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 40,
    },
  },
  container: {
    width: '100%',
    maxWidth: 1408,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 144,
      paddingRight: 144,
    },
  },
  list: {
    marginTop: 52,
    [theme.breakpoints.down('sm')]: {
      marginTop: 33,
    },
  },
  button: {
    height: 36,
    marginBottom: 16,
    marginRight: 16,
    borderRadius: 32,
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #C9CDD1',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 12,
      marginRight: 12,
    },
  },
  divider: {
    height: 1,
    marginTop: 56,
    backgroundColor: '#EDEDED',
    marginLeft: 16,
    marginRight: 16,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 60,
      marginRight: 60,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 144,
      marginRight: 144,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 38,
    },
  },
}));


