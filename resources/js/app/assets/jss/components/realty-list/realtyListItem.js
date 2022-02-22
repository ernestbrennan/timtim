
const style = (theme) => ({
  root: {
    height: 199,
    boxSizing: 'border-box',
    padding: '6px 0px',
    [theme.breakpoints.up('sm')]: {
      padding: '6px 16px',
    },
    position: 'relative',
  },
  paper: {
    boxSizing: 'border-box',
    display: 'flex',
    padding: '8px',
    minHeight: '419px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      minHeight: 'unset',
    },
    flexDirection: 'column',
    boxShadow: '0 3px 5px 0 rgba(0,0,0,0.06)',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    display: 'flex',
    flexGrow: 1
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 243,
      minWidth: 243,
      height: '100%',
    },
    height: 250,
  },
  promo: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 0,
    left: 0,
  },
  labelContainer: {
    marginLeft: '8px',
  },
  content: {
    flexGrow: 1,
    textAlign: 'left',
    padding: '8px 8px 8px 16px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  price: {
    fontWeight: 700,
  },
  gallery: {
    height: 100,
    width: 50,
  },
  properties: {
    display: 'flex',
    padding: '10px 0',
  },
  address: {
    fontSize: 13,
    letterSpacing: -0.14,
  },
  cardFooter: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    flexGrow: 1,
    marginBottom: 5
  },
  verifiedIcon: {
    marginLeft: -3,
    paddingRight: 5,
  },
  provider: {
    fontSize: 12,
    color: '#77828D',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  spacer: {
    flexGrow: 1,
  },
  panel: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0 0 16px 16px',
    padding: '16px',
  },
  galleryContainer: {
    width: 243,
    height: 183,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',

    borderRadius: 4,
    backgroundImage: 'linear-gradient(88deg, #EDEDED 0%, #FAFAFA 100%)',
  },
  textPlaceholder: {
    borderRadius: 8,
    backgroundImage: 'linear-gradient(88deg, #EDEDED 0%, #FAFAFA 100%)',
    minHeight: 20,
    marginBottom: 15,
  },
  phoneButton: {
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.primary.white,
    background: theme.palette.primary.gradient,
    borderRadius: 3,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  iconBtn: {
    padding: 7,

    '& svg': {
      fontSize: 15
    }
  },
  subwayDistance: {
    display: 'flex',
    alignItems: 'center',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 25,
    top: 18,
    cursor: 'pointer',

    [theme.breakpoints.down('xs')]: {
      top: 270,
      right: 10
    },
  },
  geoBtn: {
    position: 'absolute',
    right: 25,
    top: 58,
    cursor: 'pointer',
  },
  pedestrianIcon: {
    paddingRight: 4,
  },
})

export default style