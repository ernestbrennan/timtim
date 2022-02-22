import React from 'react';
import { makeStyles } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';

const buttonColor = '#F9C834';
const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 140,
    height: 37,
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: buttonColor,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.235422)',
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: -0.15,
    color: theme.palette.secondary.contrastText,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: darken(buttonColor, 0.03),
    },
    '&:active': {
      background: darken(buttonColor, 0.05),
    },
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:active': {
      textDecoration: 'none',
    },
  },
}));
const ProviderButton = ({ text, url }) => {
  const classes = useStyles();
  return (
    <a href={url} className={classes.link} target="_blank" rel="noopener noreferrer nofollow">
      <div className={classes.button}>
        {text}
        <div className={classes.arrow}>›</div>
      </div>
    </a>
  );
};

export default ProviderButton;
