import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {Trans} from '@lingui/macro';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles, Hidden} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import RoomIcon from '@material-ui/icons/Room';
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";

import SwipableRealtyListImageContainer from './SwipableRealtyListImageContainer';
import RealtyProperties from './RealtyProperties';
import FavoriteBtn from '$app/components/common/favorite-btn';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import {getTime} from '$app/utlis/flat';
import {getRealtyPriceText} from '$js/utils/price'
import realtyListItem from "$app/assets/jss/components/realty-list/realtyListItem";

const styles = (theme) => ({
  ...realtyListItem(theme),
})
const useStyles = makeStyles(styles);

export default (
  {
    realty,
    isFavorite,
    onHighlight,
    onAddToFavorites,
    onRemoveFromFavorites,
    shownPhonesByFlatId,
    onAdvertiserProfileSelected,
    onGeoZoomSelected,
    onListFlatHighlighted,
    style,
    index,
  }
) => {
  const classes = useStyles()
  const currentLanguage = useSelector((state) => state.ui.language);
  const advUrl = useGetFullRoute(`/${realty?.adv_type}/realty/${realty?.id}/`);

  const [isPhoneVisible, setIsPhoneVisible] = useState(false)
  const [isHover, setIsHover] = useState(false)

  if (!realty) {
    return (
      <div className={classes.root} style={style}>
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.imageContainer}>
            <div className={classes.imagePlaceholder}/>
          </div>
          <div className={classes.content}>
            <div className={classes.textPlaceholder} style={{width: '75%'}}/>
            <div className={classes.textPlaceholder} style={{width: '60%'}}/>
            <div className={classes.textPlaceholder} style={{width: '40%'}}/>

            <div className={classes.spacer}/>
            <div className={classes.textPlaceholder} style={{width: '30%', marginBottom: 0}}/>
          </div>
        </Paper>
      </div>
    );
  }
  const {
    id,
    images,
    room_count,
    currency,
    price,
    size_total,
    floor,
    floor_count,
    street_type,
    street_name,
    house_number,
    created_at,
    advertiser,
    adv_type,
    city,
  } = realty;

  const address = [ city.name, street_type, street_name, house_number].filter(Boolean).join(', ');

  const onMouseOver = () => {
    onHighlight(id);
    setIsHover(true);
  };
  const onMouseLeave = () => {
    onHighlight(null);
    setIsHover(false);
  };
  const onFavorite = () => isFavorite ? onRemoveFromFavorites(id) : onAddToFavorites(id);

  return (
    <div
      className={classes.root}
      style={style}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.imageContainer}>
          <SwipableRealtyListImageContainer images={images}/>
        </div>

        <Link
          to={advUrl}
          href={advUrl}
          className={classes.link}
        >
          <div className={classes.content}>
            <Typography className={classes.price}>
              {getRealtyPriceText(adv_type, currency, price)}
            </Typography>
            <section className={classes.properties}>
              <RealtyProperties
                roomCount={room_count}
                sizeTotal={size_total}
                floor={floor}
                floorCount={floor_count}
              />
            </section>
            <section className={classes.address}>
              {address}
            </section>
            <div className={classes.spacer}/>
            <section className={classes.cardFooter}>
              <span className={classes.date}>{getTime(created_at, currentLanguage)}</span>
            </section>

            <Button
              className={classes.phoneButton}
              onClick={(e) => {
                e.preventDefault();
                setIsPhoneVisible(true)
                onAdvertiserProfileSelected({advertiser});
              }}
              fullWidth
            >
              {isPhoneVisible ? advertiser.phone_number : (
                <Trans>Show phone number</Trans>
              )}
            </Button>
          </div>
        </Link>
      </Paper>

      <FavoriteBtn
        className={classes.favoriteBtn}
        isFavorite={isFavorite}
        onClick={onFavorite}
      />

      {isHover && (
        <Hidden smDown>
          <IconButton
            className={classNames(classes.iconBtn, classes.geoBtn)}
            variant="outlined"
            color="primary"
            onClick={() => {
              onGeoZoomSelected(id);
            }}
          >
            <RoomIcon/>
          </IconButton>
        </Hidden>
      )}
    </div>
  );
}