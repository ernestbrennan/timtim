import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {Hidden} from '@material-ui/core';
import {Trans} from '@lingui/macro';

import DeveloperInfo from './DeveloperInfo';
import Text, {TextColors} from '../common/Text';
import StyledLink from '../common/StyledLink';
import SwipableRealtyListImageContainer from '$app/components/realty-list/SwipableRealtyListImageContainer';
import {formatToCurrencyPrice} from '$app/utlis/price';
import Routes from '$app/utlis/routes';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import FavoriteBtn from "$app/components/common/favorite-btn";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = (forceVertical) => makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: forceVertical ? 'unset' : '6px 0px',
    position: 'relative',
    [!forceVertical && theme.breakpoints.up('sm')]: {
      padding: '6px 16px',
    },
  },
  paper: {
    display: 'flex',
    padding: '8px',
    position: 'relative',
    flexDirection: 'column',
    boxShadow: forceVertical ? undefined : '0 3px 5px 0 rgba(0,0,0,0.06)',
    borderRadius: '8px',
    [!forceVertical && theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },

    height: forceVertical ? '100%' : undefined,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    [!forceVertical && theme.breakpoints.up('sm')]: {
      width: 243,
      minWidth: 243,
      height: '100%',
    },
    height: 250,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    textAlign: 'left',
    padding: '8px 8px 8px 16px',
    cursor: 'pointer',
  },
  name: {
    lineHeight: '28px',
    fontWeight: 900,
  },
  price: {
    fontFamily: 'sans-serif',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: '6px',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 25,
    top: forceVertical ? 280 : 18,
    cursor: 'pointer',

    [!forceVertical && theme.breakpoints.down('xs')]: {
      top: 270,
      right: 10
    },
  },
  geoBtn: {
    display: forceVertical ? 'none' : undefined,
    position: 'absolute',
    right: 25,
    top: 58,
    cursor: 'pointer',
  },
  iconBtn: {
    padding: 7,

    '& svg': {
      fontSize: 15
    }
  },
}))();


function ComplexListItem(
  {
    complex: {
      id,
      name,
      developer,
      images,
      street_type,
      street_name,
      house_number,
      city,
      min_full_price,
      min_per_square_meter_price,
      currency,
      nearest_release_quarter,
      nearest_release_year,
    },
    complex,
    isFavorite,
    onAddToFavorites,
    onRemoveFromFavorites,
    onHighlight,
    onGeoZoomSelected,
    forceVertical,
    dispatch,
    ...props
  }) {

  const classes = useStyles(forceVertical);
  const [isHover, setIsHover] = useState(false)
  const address = [city.name, street_type, street_name, house_number].filter(Boolean).join(', ');

  const onMouseOver = useCallback(() => {
    onHighlight(id);
    setIsHover(true);
  }, [onHighlight, setIsHover, id]);

  const onMouseLeave = useCallback(() => {
    onHighlight(null);
    setIsHover(false);
  }, [onHighlight, setIsHover]);


  const onFavoriteClick = useCallback(() => {
    if (isFavorite) {
      onRemoveFromFavorites(id);
    } else {
      onAddToFavorites(id);
    }
  }, [onRemoveFromFavorites, onAddToFavorites, isFavorite, id, complex]);

  const onImageSelect = useCallback(() => null, []);

  return (
    <div className={classes.root} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} {...props}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.imageContainer}>
          <SwipableRealtyListImageContainer
            images={images}
            onSelect={onImageSelect}
            forceImageHeight={forceVertical ? 250 : undefined}
          >
          </SwipableRealtyListImageContainer>
        </div>
        <StyledLink to={useGetFullRoute(Routes.complexPage(id))}>
          <div className={classes.dataContainer}>
            <DeveloperInfo developer={developer}/>
            <div className={classes.name}>{name}</div>
            {min_per_square_meter_price && (
              <div className={classes.price}>
                <Trans>from</Trans> {formatToCurrencyPrice(min_per_square_meter_price, currency)}
                <Trans>/m{'\u00B2'}</Trans>
              </div>
            )}
            <Text size={13} color={TextColors.secondary}>
              <Trans>
                Closest due date - in {nearest_release_quarter} q. {nearest_release_year}
              </Trans>
            </Text>
            <Text size={13}>{address}</Text>

          </div>
        </StyledLink>
      </Paper>

      <FavoriteBtn
        className={classes.favoriteBtn}
        isFavorite={isFavorite}
        onClick={onFavoriteClick}
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ComplexListItem);
