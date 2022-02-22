import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '0 16px',
    background: theme.palette.primary.gradient,
    // background: theme.palette.primary.main,
    flexDirection: 'column',
    color: theme.palette.primary.white,
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
  container: {
    paddingTop: 40,
    paddingRight: 70,
    paddingLeft: 70,
  },
  gridItem: {
    padding: '0 10px',
    marginBottom: 20
  },
  columnTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.25,
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  },
  columnLink: {
    fontWeight: 500,
    fontSize: 68,
    lineHeight: 1.25,
    color: theme.palette.primary.white,
    marginBottom: theme.spacing(3),
  },
  about: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 240,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'unset',
    },
  },
  linkColumns: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-around',
    },
  },
  iconBtn: {
    color: theme.palette.primary.white,
    // border: '1px solid',
    // borderColor: theme.palette.primary.white,
    padding: 10,
    marginRight: 10
  },
  copyright: {
    paddingBottom: 25,
    marginTop: 30,
    width: '100%',
    textAlign: 'center',
    fontSize: 13,
    opacity: '0.6',
    color: theme.palette.primary.white,
  }
}));


