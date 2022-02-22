import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
    color: '#858585'
  },
  gallery: {
    maxWidth: 1140,
    width: '100%',
    borderRadius: 22,
  },
  container: {
    width: '100%',
    maxWidth: 1140,
  },
  containerParent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  galleryContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  galleryButton: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 16,

    background: '#FFFFFF',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.301273)',
    borderRadius: 20,
    padding: 10,

    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'center',

    color: theme.palette.secondary.textColor,
    cursor: 'pointer',
  },
  priceOnTop: {
    display: 'none',
    fontSize: '16px',
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  content: {
    width: '100%',
    maxWidth: 800,
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 15,
      paddingRight: 15,
      maxWidth: '100%',
    },
  },
  website: {
    textDecoration: 'none',
    color: '#0092A8',
    '&:active': {
      color: '#0092A8',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
    fontSize: 14,
  },
  linkText: {
    paddingLeft: 6,
  },
  description: {
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: -0.3587,
    color: theme.palette.secondary.contrastText,
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(3),
  },
  columnRight: {
    position: 'relative',
    top: -68,
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 8px',
    },
  },
  developerContacts: {
    position: 'sticky',
    top: 10,
    right: 200,
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      paddingBottom: 0,
    },
  },
  price: {
    display: 'none',
    '@media (max-width: 1088px)': {
      display: 'initial',
    },
  },
  spacer: {
    height: 20,
    minHeight: 20,
  },
  phoneButtonContainer: {
    width: 285,
  },
  columns: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  contactDeveloperContainer: {
    position: 'relative',
  },
  developer_button: {
    padding: 10,
  },
  addressText: {
    padding: '0 0 8px 0',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    marginBottom: theme.spacing(3)
  },
  promo: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 0,
    left: '16px',
  },
  float_button: {
    width: 'calc(100% - 32px)',
    position: 'absolute',
    zIndex: 1,
    bottom: '8px',
    margin: '0 16px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.235422)',
  },
  breadcrumbsWrapper: {
    margin: '0 auto',
    maxWidth: 955,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    '&:active': {
      color: '#000',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  about: {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.white,
    borderRadius: 10,
    padding: 20
  },
  closeBtn: {
    position: 'absolute',
    top: -16,
    right: 24,
    cursor: 'pointer',
    padding: 0
  },
}));


