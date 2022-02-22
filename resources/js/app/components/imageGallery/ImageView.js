import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  },
  image: {
    height: '100%',
    maxHeight: '80vh',
    maxWidth: '80vw',
    objectFit: 'contain',
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  hidden: {
    opacity: 0,
  },
  fadeIn: {
    animation: '$fadeIn .5s ease',
  },
}));

const ImageView = (props) => {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={classes.root}>
      <img
        {...props}
        onLoad={() => setIsLoaded(true)}
        className={clsx(classes.image, {
          [classes.fadeIn]: isLoaded,
          [classes.hidden]: !isLoaded,
        })}
        alt={''}
      />
    </div>
  );
};

export default ImageView;
