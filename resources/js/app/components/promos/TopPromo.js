import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 900,
    fontSize: 12,
    lineHeight: '20px',
    letterSpacing: 0.35,
    textTransform: 'uppercase',
    color: theme.palette.secondary.contrastText,
    background: '#F9C834',
    padding: '3px 12px',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.18)',
    height: '28px',
  },
}));
const TopPromo = () => {
  const classes = useStyles();
  return <div className={classes.root}>ТОП</div>;
};

export default TopPromo;
