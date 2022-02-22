import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  newBuildings: {
    paddingTop: '110px',
    paddingBottom: '72px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '32px',
      paddingBottom: '32px',
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
  title: {
    color: '#636363',
    fontSize: 18,
    fontWeight: 600,
    marginRight: 60
  },
  listWrapper: {
    maxHeight: '435px',
    overflowY: 'hidden',
  },
  buttonArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    border: 0,
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',
    '& + &': {
      marginLeft: 16,
    },
  },
  buttonMore: {
    color: theme.palette.primary.main,
    fontSize: 12,
    display: 'block',
    textAlign: 'center',
    padding: 0,
    '&:hover': {
      background: 'none'
    },
    '& svg': {
      fontSize: 18,
    },
  },
}));


