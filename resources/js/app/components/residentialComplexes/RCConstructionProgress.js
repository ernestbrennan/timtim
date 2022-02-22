import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {makeStyles, Modal, Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DateTime from 'luxon/src/datetime';
import { Trans } from '@lingui/macro';

import Text from '../common/Text';
import Title from '../common/Title';
import ImageGalleryFullScreen from '../imageGallery/ImageGalleryFullScreen';

function getButtonsStyle(isMobile) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44px',
    width: '44px',
    borderRadius: '50%',
    border: '1px solid #DFE1E5',
    cursor: 'pointer',
  };
}

const useConstructionProgressStyles = makeStyles((theme) => ({
  overflowConcealer: {
    maxHeight: '132px',
    width: '100%',
    overflowY: 'hidden',
    [theme.breakpoints.down('md')]: {
      maxHeight: 'unset',
      overflow: 'unset',
    },
  },
  root: {
    display: 'flex',
    overflow: 'auto hidden',
    width: '100%',
    '& > *': {
      marginRight: '16px',
    },
  },
  item: {
    position: 'relative',
    borderRadius: '12px',
    maxWidth: '205px',
    maxHeight: '132px',
    cursor: 'pointer',
  },
  image: {
    width: '205px',
    height: '132px',
    borderRadius: '12px',
  },
  date: {
    background: '#FFE36F',
    padding: '8px 12px',
    borderRadius: '0 0 12px 12px',
    position: 'absolute',
    left: '8px',
    textTransform: 'capitalize',
  },
}));

function RCConstructionProgress({ progress, isMobile }) {
  const styles = useConstructionProgressStyles();
  const currentLanguage = useSelector((state) => state.ui.language);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [startingIndex, setStartingIndex] = useState(0);
  const scrollRef = useRef();

  const toggleLargeImages = useCallback((state, startingIndex = 0) => {
    setShowLargeImage(state);
    setStartingIndex(startingIndex);
  }, []);

  const onClickLeft = useCallback(() => {
    scrollRef.current.scrollBy({
      left: isMobile ? -221 : -221 * 3,
      behavior: 'smooth',
    });
  }, [isMobile]);
  const onClickRight = useCallback(() => {
    scrollRef.current.scrollBy({
      left: isMobile ? 221 : 221 * 3,
      behavior: 'smooth',
    });
  }, [isMobile]);

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Title>
          <Typography variant={'h3'}>
            <Trans>Construction progress</Trans>
          </Typography>
        </Title>
        <Box display={'flex'} alignItems={'center'}>
          <Box style={getButtonsStyle(isMobile)} onClick={onClickLeft} mr={2}>
            <KeyboardArrowLeft />
          </Box>
          <Box style={getButtonsStyle(isMobile)} onClick={onClickRight}>
            <KeyboardArrowRight />
          </Box>
        </Box>
      </Box>
      <Box className={styles.overflowConcealer}>
        <Box className={styles.root} ref={scrollRef}>
          {progress.map((item, index) => (
            <Box
              key={index}
              className={styles.item}
              onClick={() => {
                toggleLargeImages(true, index);
              }}
            >
              <Box className={styles.date}>
                <Text>
                  {DateTime.fromISO(item.date).setLocale(currentLanguage).toFormat('LLLL yyyy')}
                </Text>
              </Box>
              <img className={styles.image} src={item.img} alt={''} />
            </Box>
          ))}
        </Box>
      </Box>
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
          <ImageGalleryFullScreen
            images={progress.map((item) => item.img)}
            startIndex={startingIndex}
            onClose={() => {
              toggleLargeImages(false);
            }}
          />
        </div>
      </Modal>
    </Box>
  );
}

export default RCConstructionProgress;
