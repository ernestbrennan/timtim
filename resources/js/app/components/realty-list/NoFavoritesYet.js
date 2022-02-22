import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import notFound from '@app/img/notFound.png';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    paddingTop: '20%',
  },

  mainText: {
    fontWeight: 500,

    letterSpacing: -0.21,

    color: theme.palette.secondary.contrastText,

    marginTop: theme.spacing(3),
    fontSize: 20,
  },
  subText: {
    paddingLeft: '20%',
    paddingRight: '20%',
    margin: theme.spacing(1),
    fontSize: 14,
    lineHeight: 1.57,
    letterSpacing: -0.15,
    color: '#54606A',
  },
}));
const NoFavoritesYet = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={notFound} alt=""/>
      <div className={classes.mainText}>
        <Trans>It's empty here for now</Trans>
      </div>
      <div className={classes.subText}>
        <Trans>Add the ads you've liked your favorites to view them later</Trans>
      </div>
    </div>
  );
};

export default NoFavoritesYet;
