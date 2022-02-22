import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Trans } from '@lingui/macro';

import LayoutStatsBlock from './LayoutStatsBlock';
import HoverIcon from '../common/hoverIcon/HoverIcon';
import StyledButton from '../common/StyledButton';
import Text, { TextColors, TextWeight } from '../common/Text';
import ImageGalleryFullScreen from '../imageGallery/ImageGalleryFullScreen';
import FavoriteIcon from '$app/icons/FavoriteIcon';
import FavoriteActiveIcon from '$app/icons/FavoriteActiveIcon';
import SvgNoImage from '$app/icons/SvgNoImage';
import CloseIcon from '$app/icons/CloseIcon';
import { getPrettyPriceString } from '$app/utlis/common';
import { getStatusStringFromLayout } from '$app/utlis/realEstateDevelopers';
import { formatToCorrectPrice } from '$app/utlis/price';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#FFFFFF',
    border: '1px solid #EDEDED',
    borderRadius: '8px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    padding: 8,
    height: 200,
    minWidth: 632,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
      height: 400,
      flexDirection: 'column',
    },
  },
  imageContainer: {
    overflow: 'hidden',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: 1,
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '183px',
    },
  },
  info: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '8px 8px 8px 16px',
  },
  favButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: 280,
    },
  },
  pricing: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullPrice: {
    fontSize: '16px',
    lineHeight: '28px',
  },
  pricePerMeter: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    lineHeight: '20px',
    color: theme.palette.primary.lightText,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  available: {
    display: 'flex',
    justifyContent: 'center',
  },
  layoutImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function LayoutListing({
  layout,
  onClarifyClick,
  isFavourite,
  onAddLayoutToFavorites,
  onRemoveLayoutFromFavorites,
}) {
  const styles = useStyles();
  const [showLargeImage, setShowLargeImage] = useState(false);

  const onFavouriteClick = useCallback(() => {
    if (isFavourite) {
      onRemoveLayoutFromFavorites(layout.id);
    } else {
      onAddLayoutToFavorites(layout.id);
    }
  }, [onRemoveLayoutFromFavorites, onAddLayoutToFavorites, isFavourite, layout]);

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        {layout.images && layout.images.length > 0 ? (
          <img
            className={styles.image}
            src={layout?.images[0]}
            alt={"flat's layout"}
            onClick={() => setShowLargeImage(true)}
          />
        ) : (
          <SvgNoImage />
        )}
      </div>
      <div className={styles.info}>
        <Text size={14} color={TextColors.secondary}>
          {getStatusStringFromLayout(layout)}
        </Text>
        <div className={styles.pricing}>
          <Text size={16} weight={TextWeight.bold}>
            {getPrettyPriceString(layout.min_price_uah)}
          </Text>{' '}
          <Text position={'relative'} ml={'8px'} mb={'-1px'} size={13} color={TextColors.secondary}>
            ({formatToCorrectPrice(Math.ceil(layout.min_price_uah / layout.size_total))}{' '}
            <Trans>UAH/m</Trans>
            {'\u00B2'})
          </Text>
        </div>
        <LayoutStatsBlock layout={layout} />
        <HoverIcon
          selected={isFavourite}
          Icon={FavoriteIcon}
          HoverIcon={FavoriteActiveIcon}
          className={styles.favButton}
          onClick={onFavouriteClick}
        />
        <div className={styles.buttonsContainer}>
          <StyledButton onClick={() => onClarifyClick(layout)}>
            <b>
              <Trans>Check availability</Trans>
            </b>
          </StyledButton>
        </div>
        <Modal
          aria-labelledby="Gallery"
          aria-describedby="apartment image gallery"
          open={showLargeImage}
          BackdropProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
        >
          <div style={{ outline: 0 }}>
            {layout.images && layout.images.length > 1 ? (
              <ImageGalleryFullScreen
                images={layout.images}
                startIndex={0}
                onClose={() => {
                  setShowLargeImage(false);
                }}
              />
            ) : (
              <>
                <Box
                  display={'flex'}
                  height={'100vh'}
                  width={'100vw'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  {layout.images && layout.images[0] && (
                    <img
                      className={styles.layoutImage}
                      src={layout.images[0]}
                      alt={"flat's layout"}
                    />
                  )}
                </Box>
                <CloseIcon
                  style={{
                    cursor: 'pointer',
                    zIndex: 16,
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                  }}
                  onClick={() => {
                    setShowLargeImage(false);
                  }}
                />
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default LayoutListing;
