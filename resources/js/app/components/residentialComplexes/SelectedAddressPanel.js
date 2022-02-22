import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '$app/icons/CloseIcon';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  panel: {
    backgroundColor: theme.palette.primary.gradient,
    borderRadius: '0 0 16px 16px',
    padding: 16,
    paddingTop: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  street: {
    fontSize: 18,
    color: theme.palette.primary.white,
    letterSpacing: -0.19,
    lineHeight: '20px',
    textAlign: 'left',
    paddingLeft: 10,
  },
  closeBtn: {
    cursor: 'pointer'
  }
}));

const SelectedAddressPanel = ({ onClose, address }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.panel}>
      <div className={classes.street}>{address}</div>
      <IconButton
        className={classes.closeBtn}
        onClick={onClose}
      >
        <CloseIcon/>
      </IconButton>

      {/*<CloseIcon*/}
      {/*  onClick={onClose}*/}
      {/*  style={{*/}
      {/*    cursor: 'pointer',*/}
      {/*  }}*/}
      {/*/>*/}
    </Paper>
  );
};
export default SelectedAddressPanel;
