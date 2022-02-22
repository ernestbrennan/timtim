import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { virtualize } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';

import RealtyListImage from './RealtyListImage';
import SvgNoImage from '$app/icons/SvgNoImage';
import SideScrollIcon from '$app/icons/SideScrollIcon';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 250,
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
    objectFit: 'cover',
    borderRadius: 4,
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  fadeIn: {
    animation: '$fadeIn .5s ease',
  },
  overshadowLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20%',
    height: '100%',
    backgroundImage: 'linear-gradient(-90deg, rgba(0,0,0,0.00) 17%, rgba(0,0,0,0.30) 100%)',
  },
  overshadowRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20%',
    height: '100%',
    backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.00) 17%, rgba(0,0,0,0.30) 100%)',
  },
  scrollRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  scrollLeft: {
    position: 'absolute',
    left: 15,
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(180deg)',
    cursor: 'pointer',
  },
  counter: {
    background: 'rgba(0,0,0,0.60)',
    borderRadius: 16,
    position: 'absolute',
    color: '#FFF',
    padding: '5px 12px',
    fontSize: 11,
    fontWeight: 500,
    left: 12,
    bottom: 12,
  },
  missed: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EDEDED',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 184,
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
  },
}));

function SwipableRealtyListImageContainer({
  images,
  onSelect,
  noHeightLimit = false,
  forceImageHeight,
}) {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRight = useCallback(() => {
    if (!images || !images.length) {
      return;
    }
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  }, [images, currentImageIndex]);

  const scrollLeft = useCallback(() => {
    if (!images || !images.length) {
      return;
    }
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  }, [images, currentImageIndex]);

  const onRollOver = useCallback(() => setIsHover(true), []);
  const onRollOut = useCallback(() => setIsHover(false), []);
  const onSlide = useCallback((index) => setCurrentImageIndex(index), []);

  const slideRenderer = useCallback(
    ({ key, index }) =>
      Math.abs(index - currentImageIndex) < 2 ? (
        <RealtyListImage
          alt=""
          style={forceImageHeight ? { height: 250 } : undefined}
          key={key}
          src={images[index]}
          onClick={onSelect}
        />
      ) : (
        <div key={index} />
      ),
    [currentImageIndex, forceImageHeight, images, noHeightLimit, onSelect],
  );

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  if (!images) {
    return (
      <div className={classes.missed}>
        <SvgNoImage />
      </div>
    );
  }

  return (
    <div className={classes.root} onMouseEnter={onRollOver} onMouseLeave={onRollOut}>
      <VirtualizeSwipeableViews
        overscanSlideAfter={1}
        overscanSlideBefore={images.length}
        index={currentImageIndex}
        slideRenderer={slideRenderer}
        onChangeIndex={onSlide}
        slideCount={images.length}
        // enableMouseEvents={true}
      />

      {isHover && (
        <>
          <div className={clsx(classes.overshadowLeft, classes.fadeIn)} onClick={scrollLeft} />
          <div className={clsx(classes.overshadowRight, classes.fadeIn)} onClick={scrollRight} />
          <div className={classes.scrollRight} onClick={scrollRight}>
            <SideScrollIcon />
          </div>
          <div className={classes.scrollLeft} onClick={scrollLeft}>
            <SideScrollIcon />
          </div>
        </>
      )}

      <div className={classes.counter}>
        {images.length ? `${currentImageIndex + 1} / ${images.length}` : '0 / 0'}
      </div>
    </div>
  );
}

export default React.memo(SwipableRealtyListImageContainer);
