import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    paddingRight: 16,
  },
  icon: {
    marginRight: 3,
    // marginBottom: -3,
  },
  label: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1,
  },
}));

const FlatProperty = ({ Icon, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <span className={classes.label}>{children}</span>
    </div>
  );
};

export default FlatProperty;
