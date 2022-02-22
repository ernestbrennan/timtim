import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import DeveloperInfo from './DeveloperInfo';
import HoverIcon from '../common/hoverIcon/HoverIcon';
import Text, { TextColors } from '../common/Text';
import StyledLink from '../common/StyledLink';
import SwipableRealtyListImageContainer from '$app/components/realty-list/SwipableRealtyListImageContainer';
import FavoriteActiveIcon from '$app/icons/FavoriteActiveIcon';
import FavoriteIcon from '$app/icons/FavoriteIcon';
import GeoIcon from '$app/icons/GeoIcon';
import { formatToCurrencyPrice } from '$app/utlis/price';
import Routes from '$app/utlis/routes';
import useGetFullRoute from '$app/hooks/useGetFullRoute';

const useStyles = (forceVertical) =>
  makeStyles((theme) => ({
    //TODO: find better solution for forceVertical problem
    root: {
      //height: 200,
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
    properties: {
      display: 'flex',
      padding: '10px 0',
    },
    moreInfo: {
      fontSize: '13px',
      lineHeight: '20px',
    },
    favButton: {
      position: 'absolute',
      right: 25,
      top: forceVertical ? 280 : 18,
      cursor: 'pointer',
      [!forceVertical && theme.breakpoints.down('xs')]: {
        top: 280,
      },
    },
    geoButton: {
      position: 'absolute',
      right: 25,
      top: 58,
      cursor: 'pointer',
      display: forceVertical ? 'none' : undefined,
    },
    promo: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      top: 0,
      left: 8,
    },
  }))();

function formatAddress(address) {
  const addressTokens = address.split(','); //"{city}, {district}, {street}, {houseNumber}"
  return (
    <>
      {addressTokens[0]}
      {addressTokens[1] && `, ${addressTokens[1]}`} <br /> {addressTokens[2]}
      {addressTokens[3] && `, ${addressTokens[3]}`}
    </>
  );
}

function ResidentialComplexListing(
  {
    residentialComplex: {
      id,
      name,
      realEstateDeveloper,
      images,
      type,
      status,
      address,
      minimalPriceUah,
      completionQuarter,
      completionYear,
    },
    residentialComplex,
    isFavorite,
    onAddToFavorites,
    onRemoveFromFavorites,
    onHover,
    onGeoZoomSelected,
    forceVertical,
    dispatch,
    ...props
  }) {
  const styles = useStyles(forceVertical);
  const [isHovered, setHovered] = useState(false);

  const onMouseOver = useCallback(() => {
    onHover(id);
    setHovered(true);
  }, [onHover, setHovered, id]);

  const onMouseLeave = useCallback(() => {
    onHover(null);
    setHovered(false);
  }, [onHover, setHovered]);


  const onFavoriteClick = useCallback(() => {
    if (isFavorite) {
      onRemoveFromFavorites(id);
    } else {
      onAddToFavorites(id);
    }
  }, [onRemoveFromFavorites, onAddToFavorites, isFavorite, id, residentialComplex]);

  const onImageSelect = useCallback(() => null, []);

  return (
    <div className={styles.root} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} {...props}>
      <Paper className={styles.paper} elevation={0}>
        <div className={styles.imageContainer}>
          <SwipableRealtyListImageContainer
            images={images}
            onSelect={onImageSelect}
            forceImageHeight={forceVertical ? 250 : undefined}
          >
          </SwipableRealtyListImageContainer>
        </div>
        <StyledLink to={useGetFullRoute(Routes.residentialComplex(id))}>
          <div className={styles.dataContainer}>
            <DeveloperInfo developer={realEstateDeveloper} />
            <div className={styles.name}>{name}</div>
            {minimalPriceUah && (
              <div className={styles.price}>
                <Trans>from</Trans> {formatToCurrencyPrice(minimalPriceUah)}
                <Trans>/m{'\u00B2'}</Trans>
                {type && (
                  <Trans>
                    <span>, {type}</span>
                  </Trans>
                )}
              </div>
            )}
            {status && (
              <Text size={13} color={TextColors.secondary}>
                <Trans>
                  Closest due date - in {completionQuarter} q. {completionYear}
                </Trans>
              </Text>
            )}
            <Text size={13}>{formatAddress(address)}</Text>

          </div>
        </StyledLink>
      </Paper>
      <HoverIcon
        Icon={FavoriteIcon}
        HoverIcon={FavoriteActiveIcon}
        className={styles.favButton}
        onClick={onFavoriteClick}
        selected={isFavorite}
      />
      {isHovered && (
        <Hidden smDown>
          <GeoIcon
            className={styles.geoButton}
            onClick={() => {
              onGeoZoomSelected(id);
            }}
          />
        </Hidden>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(ResidentialComplexListing);
