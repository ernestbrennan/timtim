import React, { useCallback, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Hidden } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import LayoutStatsBlock from './LayoutStatsBlock';
import Text, { TextColors, TextWeight } from '../common/Text';
import HoverIcon from '../common/hoverIcon/HoverIcon';
import StyledButton from '../common/StyledButton';
import { getStatusStringFromLayout } from '$app/utlis/realEstateDevelopers';
import { getPrettyPriceString } from '$app/utlis/common';
import { formatToCorrectPrice } from '$app/utlis/price';
import Routes from '$app/utlis/routes';
import FavoriteIcon from '$app/icons/FavoriteIcon';
import FavoriteActiveIcon from '$app/icons/FavoriteActiveIcon';
import GeoIcon from '$app/icons/GeoIcon';
import useGetFullRoute from '$app/hooks/useGetFullRoute';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRadius: 8,
    width: '100%',
    padding: 8,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: 200,
      padding: '8px 16px',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    borderRadius: 8,
    boxShadow: '0 3px 5px 0 rgba(0,0,0,0.06)',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  image_wrapper: {
    overflow: 'hidden',
    display: 'flex',
    justifyItems: 'center',
    alignContent: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 243,
      width: '100%',
    },
  },
  image: {
    height: 250,
    margin: '0 auto',
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      height: 186,
    },
  },
  content: {
    flex: 1,
    textAlign: 'left',
    padding: '10px 12px 20px',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 10,
    },
  },
  price: {
    margin: '5px 0',
  },
  price__area: {
    marginLeft: 9,
  },
  actions: {
    marginTop: 15,
  },
  actions__button: {
    padding: '5px 18px',
  },
  actions__link: {
    cursor: 'pointer',
  },
  favButton: {
    position: 'absolute',
    right: 25,
    top: 18,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      top: 280,
    },
  },
  geoButton: {
    position: 'absolute',
    right: 25,
    top: 58,
    cursor: 'pointer',
  },
}));

function SmallLayoutListing({
  layout,
  isFavourite,
  onGoToRCClick,
  onRemoveFromFavorites,
  onAddToFavorites,
  onClarifyClick,
  onHover,
  onGeoZoomSelected,
  ...props
}) {
  const styles = useStyles();
  const [isHovered, setHovered] = useState(false);

  const RCLink = useGetFullRoute(Routes.residentialComplex(layout.complex_id));

  const onMouseOver = useCallback(() => {
    onHover && onHover(layout.complex_id);
    setHovered(true);
  }, [onHover, setHovered, layout]);

  const onMouseLeave = useCallback(() => {
    onHover && onHover(null);
    setHovered(false);
  }, [onHover, setHovered]);

  const handleClarifyClick = useCallback(() => {
    if (typeof onClarifyClick !== 'function') {
      return;
    }

    onClarifyClick(layout);
  }, [layout, onClarifyClick]);

  const handleGeoZoomSelected = useCallback(() => {
    if (typeof onGeoZoomSelected !== 'function') {
      return;
    }

    onGeoZoomSelected(layout.complex_id);
  }, [layout.complex_id, onGeoZoomSelected]);

  const localGoToRCClick = () => {
    window.open(RCLink, '_blank');
  };

  const onFavouriteClick = useCallback(() => {
    if (isFavourite) {
      onRemoveFromFavorites(layout.id);
    } else {
      onAddToFavorites(layout.id);
    }
  }, [onRemoveFromFavorites, onAddToFavorites, isFavourite, layout]);

  const fixedOnGoToRCClick = onGoToRCClick || localGoToRCClick;

  return (
    <div className={styles.root} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} {...props}>
      <Paper elevation={0} className={styles.paper}>
        <div className={styles.image_wrapper}>
          <img src={layout.images[0]} alt="flat's layout" className={styles.image} />
        </div>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          className={styles.content}
        >
          <div>
            <Text color={TextColors.secondary}>{getStatusStringFromLayout(layout)}</Text>
            <Text color={TextColors.secondary}>{layout.complex_name} </Text>
            <Box display="flex" alignItems="center" className={styles.price}>
              <Text size={16} weight={TextWeight.bold}>
                {getPrettyPriceString(layout.min_price_uah)}
              </Text>
              <Text size={13} weight={TextWeight.semiLight} className={styles.price__area}>
                ({formatToCorrectPrice(Math.ceil(layout.min_price_uah / layout.size_total))} грн/м
                {'\u00B2'})
              </Text>
            </Box>
            <LayoutStatsBlock layout={layout} />
          </div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className={styles.actions}
          >
            <StyledButton className={styles.actions__button} onClick={handleClarifyClick}>
              <Text size={13}>
                <Trans>Check availability</Trans>
              </Text>
            </StyledButton>
            <Text className={styles.actions__link} size={13} onClick={fixedOnGoToRCClick}>
              <Trans>Go to RC</Trans>
            </Text>
          </Box>
        </Box>
        <HoverIcon
          Icon={FavoriteIcon}
          HoverIcon={FavoriteActiveIcon}
          className={styles.favButton}
          selected={isFavourite}
          onClick={onFavouriteClick}
        />
        {isHovered && (
          <Hidden smDown>
            <GeoIcon className={styles.geoButton} onClick={handleGeoZoomSelected} />
          </Hidden>
        )}
      </Paper>
    </div>
  );
}

export default SmallLayoutListing;
