import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 1.42,
    textAlign: 'center',
    color: theme.palette.secondary.contrastText,
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
}));
const AuthHeader = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default AuthHeader;
