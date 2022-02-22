import React from 'react';
import { makeStyles } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import cls from 'classnames';

const buttonColor = '#02A3BB';
const disabledColor = '#909090';
const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.1,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 100,
    background: buttonColor,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.24)',
    padding: 15,
    marginTop: theme.spacing(6),
    cursor: 'pointer',
    '&:hover': {
      background: darken(buttonColor, 0.03),
    },
  },
  disabled: {
    background: disabledColor,
    '&:hover': {
      background: disabledColor,
      cursor: 'initial',
    },
  },
}));
const AuthButton = ({ disabled = false, children }) => {
  const classes = useStyles();
  return <div className={cls(classes.root, { [classes.disabled]: disabled })}>{children}</div>;
};

export default AuthButton;
