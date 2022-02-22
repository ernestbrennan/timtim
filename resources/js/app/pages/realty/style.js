import {makeStyles} from "@material-ui/core";

const columnWidth = 622;
const columnMarginSmall = 100;

export default makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  gallery: {
    maxWidth: 1140,
    width: '100%',
    borderRadius: 22,
  },
  container: {
    maxWidth: 1140,
  },
  containerParent: {
    display: 'flex',
    justifyContent: 'center',
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
  content: {
    width: '100%',
    maxWidth: 800,
    //marginLeft: columnMargin,
    marginTop: 30,
    // [theme.breakpoints.down('md')]: {
    //   marginLeft: columnMarginSmall,
    // },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20,
      marginRight: 20,
      maxWidth: '100%',
    },
  },
  properties: {
    display: 'flex',
    padding: '10px 0',
    color: theme.palette.secondary.main
  },
  street: {
    fontWeight: 500,
    fontSize: 28,
    lineHeight: 1.1,
    letterSpacing: -0.2,
    color: '#545454',
    paddingBottom: theme.spacing(1),
  },
  publish: {
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#54606A',
    paddingBottom: theme.spacing(3),
  },

  title: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.5,
    color: '#5F5F5F',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  description: {
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: -0.3587,
    color: theme.palette.secondary.textColor,
    marginBottom: 20,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 100,
  },

  contacts: {
    position: 'sticky',
    top: 0,
    marginTop: -81,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {},
    '@media (max-width: 1088px)': {
      display: 'none',
    },
  },
  price: {
    display: 'none',
    color: theme.palette.secondary.main,
    '@media (max-width: 1088px)': {
      display: 'initial',
    },
  },
  contactInfoBottom: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'none',
    '@media (max-width: 1088px)': {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      '& > *:first-child': {
        marginBottom: '24px',
      },
    },
  },
  contactInfoBottomProviders: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'none',
    '@media (max-width: 1088px)': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(3),
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
    justifyContent: 'center',
  },
  columnRight: {
    display: 'relative',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 24,
    top: 24,
    cursor: 'pointer',
  },
  breadcrumbsWrapper: {
    margin: '0 auto',
    maxWidth: 955,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },

  map: {
    marginTop: 10,
    marginBottom: 10,
  }
}));


