import React from 'react';
import {Divider, makeStyles} from '@material-ui/core';

import LandlordPhoneButton from './LandlordPhoneButton';
import HoverIcon from '../common/hoverIcon/HoverIcon';
import FormattedPrice from '$app/components/common/formatters/FormattedPrice';
import LandlordProfileSmall from '$app/components/landlordProfile/LandlordProfileSmall';
import FavoriteIcon from '$app/icons/FavoriteIcon';
import FavoriteActiveIcon from '$app/icons/FavoriteActiveIcon';
import FavoriteBtn from "$app/components/common/favorite-btn";

const useStyles = makeStyles((theme) => ({
  price: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.1,
    letterSpacing: 0.38,
    color: '#000',
    display: 'flex',
    alignItems: 'flex-end',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  phoneButtonContainer: {
    marginTop: theme.spacing(3),
  },
  favoriteBtn: {
    position: 'absolute',
    right: 24,
    top: 24,
    cursor: 'pointer',
  },
}));
const ContactPanelLandlord = (
  {
    priceText,
    currency,
    advertiser,
    isPhoneShown,
    onPhoneClick,
    onFavoriteClick,
    isFavorite,
  }
) => {
  const classes = useStyles();
  const {first_name, avatar, phone_number, registered_at} = advertiser;

  return (
    <>
      <div className={classes.price}>
        <div>
          {priceText}

          <FavoriteBtn
            onClick={onFavoriteClick}
            className={classes.favoriteBtn}
            isFavorite={isFavorite}
          />

        </div>
      </div>
      <div className={classes.phoneButtonContainer}>
        <LandlordPhoneButton
          isPhoneShown={isPhoneShown}
          onClick={onPhoneClick}
          phoneNumber={phone_number}
        />
      </div>
      <Divider className={classes.divider}/>
      <LandlordProfileSmall
        firstName={first_name}
        avatar={avatar}
        joiningDate={registered_at}
      />
    </>
  );
};

export default ContactPanelLandlord;
