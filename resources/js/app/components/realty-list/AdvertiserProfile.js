import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  blockContainer: {
    padding: 38,
  },
  phone: {
    fontSize: 32,
    fontWeight: 500,
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  phoneContainer: {
    marginTop: theme.spacing(3),
  },
  referenceText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#77828D',
    marginTop: theme.spacing(1),
  },
  strongText: {
    fontWeight: 900,
  },
}));
const getFormattedPhone = (phone) => {
  if (phone.length !== 13) {
    return phone;
  }
  const part1 = phone.substring(0, 3);
  const part2 = phone.substring(3, 6);
  const part3 = phone.substring(6, 9);
  const part4 = phone.substring(9, 11);
  const part5 = phone.substring(11, 13);
  return `${part1} (${part2}) ${part3} ${part4} ${part5}`;
};


const AdvertiserProfile = ({ advertiser }) => {
  const classes = useStyles();
  const phone = advertiser && advertiser.phone_number ? advertiser.phone_number : '';

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.blockContainer}>
          <div className={classes.phoneContainer}>
            <a href={`tel:${phone}`} className={classes.phone}>
              {getFormattedPhone(phone)}
            </a>
          </div>
          <div className={classes.referenceText}>
            <Trans>Say that you found this ad on</Trans>{' '}
            <span className={classes.strongText}>TimTim</span>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default AdvertiserProfile;
