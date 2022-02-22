import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = (noHeightLimit) =>
  makeStyles((theme) => ({
    image: {
      width: '100%',
      height: noHeightLimit ? undefined : 184,
      objectFit: 'cover',
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
  }))();

function FlatListImage(props) {
  const { noHeightLimit } = props;
  const classes = useStyles(noHeightLimit);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <img
      {...props}
      onLoad={() => setIsLoaded(true)}
      className={clsx(classes.image, {
        [classes.fadeIn]: isLoaded,
        [classes.hidden]: !isLoaded,
      })}
      alt={"flat's interior or exterior"}
    />
  );
}

export default React.memo(FlatListImage);
