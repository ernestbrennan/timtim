import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import OwnerIcon from '$app/icons/OwnerIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'flex-start',
    },
  },
  info: {
    marginLeft: 16,
  },

  avatarImage: {
    backgroundColor: '#eee',
    borderRadius: '50%',
    width: 48,
    height: 48,
    objectFit: 'cover',
  },
  name: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.35,
    letterSpacing: -0.17,
    display: 'flex',
  },
  date: {
    fontSize: 12,
    lineHeight: 1.82,
    letterSpacing: -0.14,
    color: '#77828D',
  },
  ownerIcon: {
    marginLeft: 6,
  },
  owner: {
    marginLeft: 6,
    color: '#02A3BB',
    fontSize: 14,
  },
}));

const LandlordProfileSmall = ({ firstName, isOwner, avatar, joiningDate }) => {
  const classes = useStyles();
  const date = new Date(joiningDate);
  const year = date.getFullYear();

  return (
    <div className={classes.root}>
      <div>
        {avatar && <img src={avatar} className={classes.avatarImage} alt={"landlord's avatar"} />}
      </div>
      <div className={classes.info}>
        <div className={classes.name}>{firstName}</div>
        <div className={classes.date}><Trans>at TimTim since {year}</Trans></div>
      </div>
    </div>
  );
};

export default LandlordProfileSmall;
