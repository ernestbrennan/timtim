import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Divider, Typography} from '@material-ui/core';
import { Trans } from '@lingui/macro';
import classNames from 'classnames';

import FavoriteBtn from "$app/components/common/favorite-btn";
import { formatToCurrencyPrice } from '$app/utlis/price';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 395,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: '0 16px 16px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.235422)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
  },
  favorites: {
    position: 'relative',
    padding: '16px 4px',
    color: 'black'
  },
  favorites__title: {
    lineHeight: '32px',
  },
  divider: {
    margin: '0 4px',
  },
  container: {
    padding: '12px 4px',
    maxWidth: '300px',
  },
  content: {
    padding: '12px 0',
  },
  content__title: {
    marginBottom: 8,
    lineHeight: '22px',
  },
  content__text: {
    lineHeight: '18px',
    '& + &': {
      marginTop: 6,
    },
  },
  image_container: {
    maxWidth: '33%',
    marginLeft: 10,
  },
  image: {
    maxWidth: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 0,
    top: 15,
    cursor: 'pointer',
  },

  phoneButton: {
    background: theme.palette.primary.gradient,
    borderRadius: 24,

    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1,
    textAlign: 'center',
    letterSpacing: -0.09,
    padding: 16,
    marginBottom: 30,

    color: theme.palette.primary.white,
    cursor: 'pointer',
  },
}));

function DeveloperInfoPanel({ className, complex, isFavorite, onFavoriteClick, onShowContact }) {
  const classes = useStyles();
  const { developer, min_per_square_meter_price } = complex;

  return (
    <div className={classNames(classes.wrapper, className)}>
      {typeof onFavoriteClick === 'function' && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className={classes.favorites}
          >
            <Typography variant={'h3'}>
              <Trans>from </Trans> {formatToCurrencyPrice(min_per_square_meter_price)}
              <Trans>/m{'\u00B2'}</Trans>
            </Typography>
            <FavoriteBtn
              onClick={onFavoriteClick}
              className={classes.favoriteBtn}
              isFavorite={isFavorite}
            />
          </Box>
          <div onClick={onShowContact} className={classes.phoneButton}>
            <Trans>Связаться с консультантом</Trans>
          </div>
          <Divider className={classes.divider} />
        </>
      )}
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        className={classes.container}
      >
        <Typography variant={'h5'}>
          {complex.name}
        </Typography>
      </Box>
    </div>
  );
}

export default DeveloperInfoPanel;
