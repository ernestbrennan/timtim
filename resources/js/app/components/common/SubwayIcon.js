import React from 'react';
import {makeStyles} from '@material-ui/core'

import SubwayIcon from '$app/icons/SubwayIcon';

const useStyles = makeStyles(() => ({
  root: {
    height: '18px',
    width: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function SubwayBranchMarker({ branchColor, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SubwayIcon color={branchColor} {...props} />
    </div>
  );
}
