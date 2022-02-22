import { makeStyles } from '@material-ui/core';
import React from 'react';

const useTitleStyle = makeStyles((theme) => ({
  root: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.5,
    color: '#000',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Title = ({ children }) => {
  const classes = useTitleStyle();
  return <div className={classes.root}>{children}</div>;
};

export default Title;
