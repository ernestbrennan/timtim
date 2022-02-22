import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@app/svg/walk.svg';

const boxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const DimSlider = withStyles((theme) => ({
  root: {
    color: theme.primary,
    height: 2,
    padding: '30px 0',
    marginTop: '16px',
  },
  thumb: {
    height: 32,
    width: 32,
    backgroundColor: '#fff',
    boxShadow: boxShadow,
    marginTop: -16,
    marginLeft: -16,
    // [theme.breakpoints.down('sm')]: {
    //   height: 56,
    //   width: 56,
    //   marginTop: -28,
    //   marginLeft: -28,
    // },
    backgroundImage: `url(${Icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: boxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
    whiteSpace: 'nowrap',
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    backgroundColor: 'currentColor',
  },
}))(Slider);

export default DimSlider;
