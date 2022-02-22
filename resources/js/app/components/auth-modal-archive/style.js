import {makeStyles} from "@material-ui/core";
import {darken} from "@material-ui/core/styles";

const viewportHeight = window.innerHeight;

export default makeStyles((theme) => ({
  top: {},
  backdrop: {
    background: 'linear-gradient(180deg, #34AEE1 0%, #019CDE 100%) !important',
    opacity: '0.7 !important',
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    outline: 0,
    height: '100vh',
    position: 'relative',
  },
  container: {
    width: 860,
    borderRadius: 16,
    display: 'flex'
  },
  content: {
    position: 'relative',
    width: 429,
    height: 530,
    background: '#FFF',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: '0 32px',
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      padding: '0 8px',
    },
  },
  mobileImage: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 90,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    cursor: 'pointer',
    background: '#ECECEC',
    color: theme.palette.primary.main
  },
  header: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 1.42,
    textAlign: 'center',
    color: theme.palette.secondary.contrastText,
    marginTop: theme.spacing(7),
  },
  info: {
    padding: '0 50px',
    fontSize: 14,
    lineHeight: 1.57,
    textAlign: 'center',
    color: '#77828D',
  },
  buttons: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: 80,
    padding: '0px 60px',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
  },
  phone: {
    lineHeight: 2,
    flexGrow: 1,
    marginLeft: 6,
  },
  nextButton: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.1,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 100,
    background: '#02A3BB',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.24)',
    padding: 15,
    margin: '48px 60px 0',
    cursor: 'pointer',
    '&:hover': {
      background: darken('#02A3BB', 0.03),
    },
  },
  captcha: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  storeButton: {
    position: 'absolute',
    bottom: 50,
    left: 44,
    zIndex: 10,
  },
  storeButton2: {
    position: 'absolute',
    bottom: 94,
    left: 234,
    zIndex: 12,
  },

  imageContainer: {
    width: 340,
    background: 'radial-gradient(50% 50% at 50% 50%, #45B8DF 0%, rgba(69, 184, 223, 0) 88.85%), linear-gradient(0deg, #1E6F92, #1E6F92), linear-gradient(161.18deg, #1E6F92 -1.17%, #519AB9 26.01%, #2F8CB4 49.72%, #4F879F 99.97%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: 260
    },

    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  downloadLinks: {
    display: 'flex',
    flexDirection: 'row',
    padding: '24px',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: `${viewportHeight / 2 - 270}px`,
  },
  backButton: {
    margin: '12px 0 0 12px',
    fontWeight: 400,
  },
  marginTop: {
    marginTop: 24,
  },
}));


