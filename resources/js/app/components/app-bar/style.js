import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: theme.palette.primary.white,
  },
  logo: {
    marginRight: 15,
  },
  toolbar: {
    paddingLeft: 18,
    paddingRight: 0,
  },
  titleContainer: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    margin: 0,
    marginRight: 15,
    marginLeft: 15,
    display: 'flex',
    alignItems: 'center',
    minWidth: 130,
  },
  title: {
    paddingLeft: 7,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Roboto',
  },
  cities: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: 72,
    height: 72,

    background: 'rgba(2,163,187,0)',

    borderRadius: '50%',
    '&:focus,&:hover,&:active': {
      background: 'rgba(2,163,187,0.62)',
    },
  },
  spacer: {
    flexGrow: 1,
  },
  cityIcon: {
    position: 'relative',
    margin: theme.spacing(4),
    cursor: 'pointer',
  },
  cityTitle: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    fontSize: 14,
    color: '#1F2229',
  },
  cityImg: {
    width: 72,
    height: 72,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  divider: {
    height: 30,
  },
  linkText: {
    fontSize: 14,
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginRight: 15,
    marginLeft: 15,
    lineHeight: 1,
  },
  activeLinkText: {
    fontWeight: 700,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.primary.main,
    padding: '10px 0',
  },
  authBtn: {
    fontWeight: 500,
    fontSize: 14,
    padding: '7px 12px',
    borderRadius: 50,
    marginRight: 20,
  },
  favoriteBtn: {
    padding: 10,
    marginRight: 10,
    '& svg': {
      fontSize: 18,
    }
  },
  menuBtn: {
    marginRight: theme.spacing(1),
  }
}));


