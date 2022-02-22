import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: 598,
      minWidth: 598,
    },
    '& h3': {
      paddingLeft: 30,
      marginBottom: 15
    },
    backgroundColor: '#F8F9FA',
  },
  sidebarHeader: {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.white,
    height: '110px',
    borderRadius: '0 0 8px 8px',
  },
  sidebarTabs: {
    '& .MuiTabs-indicator': {
      height: '3px',
      backgroundColor: theme.palette.primary.white,
    },
  },
  sidebarTab: {
    textTransform: 'unset',
    color: 'white',
    padding: '6px 16px',
    minWidth: '100px!important',
  },
  mapContainer: {
    display: 'flex',
    flexGrow: 1,
  },

}));


