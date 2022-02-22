import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  swipeMarkersContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  marker: {
    width: 28,
    height: 4,
    borderRadius: 4,
    background: '#D8D8D8',
    margin: 4,
    cursor: 'pointer',
  },
  markerSelected: {
    background: theme.palette.primary.main,
  },
}));

const SwipeableList = ({ children, ...rest }) => {
  const [listIndex, setListIndex] = useState(0);
  const handleChangeIndex = useCallback((index) => setListIndex(index), [setListIndex]);
  const classes = useStyles();
  return (
    <div>
      <SwipeableViews
        className={classes.swipeContainer}
        index={listIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {children}
      </SwipeableViews>
      <div className={classes.swipeMarkersContainer}>
        {children.map((_, index) => (
          <div
            key={index}
            onClick={() => setListIndex(index)}
            className={clsx(classes.marker, {
              [classes.markerSelected]: index === listIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableList;
