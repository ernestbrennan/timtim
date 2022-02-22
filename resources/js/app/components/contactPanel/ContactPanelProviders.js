import React from 'react';
import {makeStyles, Divider} from '@material-ui/core';

import ProvidersList from './ProvidersList';
import PriceField from './PriceField';
import HoverIcon from '../common/hoverIcon/HoverIcon';
import FavoriteIcon from '$app/icons/FavoriteIcon';
import FavoriteActiveIcon from '$app/icons/FavoriteActiveIcon';
import FavoriteBtn from "$app/components/common/favorite-btn";

const useStyles = makeStyles((theme) => ({
  price: {
    fontWeigth: 700,
    fontSize: 28,
    lineHeight: 1.1,
    fontWeight: 900,
    letterSpacing: 0.38,
    color: theme.palette.secondary.contrastText,
    display: 'flex',
    alignItems: 'flex-end',
  },
  priceCurrency: {
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 2,
  },
  divider: {
    marginTop: theme.spacing(3),
  },
  favoriteBtn: {
    position: 'absolute',
    right: 24,
    top: 24,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: 'unset',
    },
  },
}));
const ContactPanelProviders = (
  {
    price,
    currency,
    advType,
    providers,
    onFavoriteClick,
    isFavorite,
  }
) => {
  const classes = useStyles();
  return (
    <>
      <FavoriteBtn
        onClick={onFavoriteClick}
        className={classes.favoriteBtn}
        isFavorite={isFavorite}
      />

      <PriceField price={price} currency={currency}/>
      <Divider className={classes.divider}/>
      <ProvidersList providers={providers} advType={advType}/>
    </>
  );
};

export default ContactPanelProviders;
