import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider } from '@material-ui/core';
import { Trans, Plural } from '@lingui/macro';
import classNames from 'classnames';

import Text from '../common/Text';
import HoverIcon from '../common/hoverIcon/HoverIcon';
import { formatToCurrencyPrice } from '$app/utlis/price';
import FavoriteIcon from '$app/icons/FavoriteIcon';
import FavoriteActiveIcon from '$app/icons/FavoriteActiveIcon';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 317,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: '0 16px 16px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.235422)',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 32,
    },
  },
  favorites: {
    padding: '16px 4px',
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
}));

function DeveloperInfoPanel({ className, complexData, isFavorite, onFavoriteClick, button }) {
  const classes = useStyles();
  const { realEstateDeveloper: developer, minimalPriceUah } = complexData;

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
            <Text size={20} weight="bold" className={classes.favorites__title}>
              <Trans>from </Trans> {formatToCurrencyPrice(minimalPriceUah)}
              <Trans>/m{'\u00B2'}</Trans>
            </Text>
            <HoverIcon
              Icon={FavoriteIcon}
              HoverIcon={FavoriteActiveIcon}
              onClick={onFavoriteClick}
              selected={isFavorite}
            />
          </Box>
          <Divider className={classes.divider} />
        </>
      )}
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        className={classes.container}
      >
        <div className={classes.content}>
          <Text size={18} weight="normal" className={classes.content__title}>{developer.name}</Text>
          {Boolean(developer.finishedBuildings) && (
            <Text weight="semiLight" className={classes.content__text}>
              <b>{developer.finishedBuildings}</b>{' '}
              <Plural
                value={developer.finishedBuildings}
                one="house completed"
                few="houses completed"
                other="houses completed"
              />{' '}
              <Trans>in {developer.finishedComplexes} RCs</Trans>
            </Text>
          )}
          {Boolean(developer.inProgressBuildings) && (
            <Text weight="semiLight" className={classes.content__text}>
              <b>{developer.inProgressBuildings}</b>{' '}
              <Plural
                value={developer.inProgressBuildings}
                one="house in progress"
                few="houses in progress"
                other="houses in progress"
              />{' '}
              <Trans>in {developer.inProgressComplexes} RCs</Trans>
            </Text>
          )}
        </div>
        <div className={classes.image_container}>
          <img className={classes.image} src={developer.logoSrc} alt="real estate developer logo" />
        </div>
      </Box>
      {button}
    </div>
  );
}

export default DeveloperInfoPanel;
