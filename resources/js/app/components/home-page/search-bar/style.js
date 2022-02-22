import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 10,
    height: 60,
    width: '100%',
    padding: '10px 0px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.23)',
    [theme.breakpoints.down('md')]: {
      height: 'unset',
      flexDirection: 'column',
      borderRadius: '16px',
      padding: '8px',
    },
  },
  gridItem: {
    padding: '0 10px',
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
  },
  doneButton: {
    display: 'block',
    marginLeft: 'auto',
    color: '#ffffff',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.24)',
    background: theme.palette.primary.gradient,
    borderRadius: 24,
    padding: '8px 32px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgb(1, 114, 130)',
    },
  },

  searchBtn: {
    width: '100%',
    background: 'linear-gradient(0deg, #019CDE 0%, #56BFEC 48.23%, #74D1F9 100%)',
    borderRadius: 10,
    color: '#fff',
    textTransform: 'none',
  }
}));


