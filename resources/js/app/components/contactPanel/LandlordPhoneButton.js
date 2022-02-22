import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme) => ({
  phoneButton: {
    background: theme.palette.primary.gradient,
    borderRadius: 24,

    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1,
    textAlign: 'center',
    letterSpacing: -0.09,
    padding: 16,

    color: theme.palette.primary.white,
    cursor: 'pointer',
  },
  phone: {
    fontWeight: 700,
    fontSize: 20,
  },
}));
const LandlordPhoneButton = ({ phoneNumber, isPhoneShown, onClick }) => {
  const classes = useStyles();
  const displayPhone = phoneNumber && phoneNumber.length ? phoneNumber : '(050)-555-55-55';
  return isPhoneShown ? (
    <div className={classes.phone}>{displayPhone}</div>
  ) : (
    <div onClick={onClick} className={classes.phoneButton}>
      <Trans>Show phone</Trans>
    </div>
  );
};

export default LandlordPhoneButton;
