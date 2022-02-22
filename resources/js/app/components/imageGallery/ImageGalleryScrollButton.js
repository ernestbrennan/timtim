import React from 'react';
import { makeStyles } from '@material-ui/core';
import ScrollIcon from '$app/icons/ScrollIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: '1px solid #bababa',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: '#fff',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: '#fafafa',
      transform: 'translate(-50%, -50%) scale(1.05)',
    },
  },
}));
const ImageGalleryScrollButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <ScrollIcon />
    </div>
  );
};

export default ImageGalleryScrollButton;
