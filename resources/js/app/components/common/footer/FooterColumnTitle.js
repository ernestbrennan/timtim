import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.25,
    color: theme.palette.secondary.contrastText,
    marginBottom: theme.spacing(3),
  },
}));
const FooterColumnTitle = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default FooterColumnTitle;
