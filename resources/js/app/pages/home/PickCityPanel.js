import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import PickYourCityPanel from '$app/components/common/PickYourCityPanel';

const useStyles = makeStyles((theme) => ({
  pickYourCityPanel: {
    position: 'fixed',
    zIndex: 1000,
    top: 70,
    left: 435,
    [theme.breakpoints.down('sm')]: {
      left: 85,
    },
    [theme.breakpoints.down('xs')]: {
      top: 62,
    },
    '@media (max-width: 360px)': {
      left: 'unset',
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
}));

function PickCityPanel({ showCitySelect, hasCookie, onCityChange, onCityConfirm }) {
  const styles = useStyles();

  return (
    <Box
      className={styles.pickYourCityPanel}
      style={{
        display: showCitySelect ? 'block' : 'none',
      }}
    >
      {!hasCookie && <PickYourCityPanel onChangeCity={onCityChange} onConfirm={onCityConfirm} />}
    </Box>
  );
}

export default PickCityPanel;
