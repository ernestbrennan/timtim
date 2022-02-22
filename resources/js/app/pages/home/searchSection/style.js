import {makeStyles} from "@material-ui/core";
import homeBackground from '@app/img/home/homeBackground.png'

export default makeStyles((theme) => ({
  topBlock: {
    width: '100%',
    backgroundImage: `url(${homeBackground})`,
    backgroundRepeat: 'round',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 200,
    [theme.breakpoints.down('md')]: {
      borderRadius: 'unset',
      marginBottom: 0,
      background: theme.palette.primary.gradient,
      paddingBottom: 100
    },
  },
  waveImg: {
    width: '100vw',
    position: 'absolute',
    top: '-1px'
  },
  padding: {
    width: '100%',
    paddingLeft: '16px',
    paddingRight: '16px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '180px',
      paddingRight: '180px',
    },
  },

  homeImage: {
    position: 'absolute',
    top: 55,
    left: -245
  }
}));


