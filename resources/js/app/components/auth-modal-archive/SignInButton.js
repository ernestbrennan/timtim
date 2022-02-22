import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
    marginBottom: theme.spacing(2),
    borderRadius: 50,

    '& .MuiButton-startIcon': {
      position: 'absolute',
      left: 15,

    }
  },
}));
const SignInButton = ({ Icon, children, onClick }) => {
  const classes = useStyles();
  return (

    <Button
      variant="outlined"
      color="primary"
      onClick={onClick}
      startIcon={<Icon />}
      className={classes.root}
    >
      {children}
    </Button>
  );
};

export default SignInButton;
