import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 14,
    lineHeight: 1.57,
    textAlign: 'center',
    color: '#77828D',
    paddingLeft: 30,
    paddingRight: 30,
  },
}));
const AuthInfoText = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default AuthInfoText;
