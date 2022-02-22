import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import ImageView from './ImageView';
import ImageGalleryScrollButton from './ImageGalleryScrollButton';
import CloseIcon from '$app/icons/CloseIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    background: '#fff',
    position: 'relative',
  },
  leftButton: {
    position: 'absolute',
    // transform: 'translate(-50%, -50%)',
    top: '50%',
    left: 80,
    zIndex: 10,
  },
  rightButton: {
    position: 'absolute',
    transform: 'translate(0, -100%) rotate(180deg)',
    top: '50%',
    right: 80,
    zIndex: 10,
  },
  page: {
    position: 'absolute',
    top: 30,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  close: {
    top: 25,
    right: 25,
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 16,
  },
}));
const ImageGalleryFullScreen = ({ images, onClose, startIndex = 0 }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(startIndex);

  const handleKeyPress = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowRight': {
          setIndex((index) => (images[index + 1] ? index + 1 : index));
          break;
        }
        case 'ArrowLeft': {
          setIndex((index) => (images[index - 1] ? index - 1 : index));
          break;
        }
        default: {
          return;
        }
      }
    },
    [setIndex, images],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => document.removeEventListener('keydown', handleKeyPress, false);
  }, [handleKeyPress]);

  return (
    <div className={classes.root}>
      <div className={classes.page}>
        {index + 1}/{images.length}
      </div>
      <div className={classes.leftButton}>
        <ImageGalleryScrollButton
          onClick={() => setIndex(index > 0 ? index - 1 : images.length - 1)}
        />
      </div>
      <div className={classes.close} onClick={onClose}>
        <CloseIcon />
      </div>
      <div className={classes.rightButton}>
        <ImageGalleryScrollButton
          onClick={() => setIndex(index < images.length - 1 ? index + 1 : 0)}
        />
      </div>
      <SwipeableViews
        enableMouseEvents
        style={{ height: '100%' }}
        index={index}
        containerStyle={{ height: '100%', minHeight: '100%' }}
      >
        {images.map((image, index) => (
          <ImageView alt="" key={index} src={image} onClick={() => null} />
        ))}
      </SwipeableViews>
    </div>
  );
};

export default ImageGalleryFullScreen;
