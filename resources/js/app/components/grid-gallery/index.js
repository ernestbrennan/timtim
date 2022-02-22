import React from 'react';
import { GridList, GridListTile, makeStyles } from '@material-ui/core';

const getCols = (index, images) => {
  if (images.length === 3) {
    return 2;
  }
  if (images.length === 2) {
    if (index === 0) {
      return 2;
    } else {
      return 1;
    }
  }
  return 1;
};
const spacing = 6;
const useStyles = makeStyles((theme) => ({
  image: {
    filter: 'brightness(100%)',
    transition: 'filter 0.8s ease',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(80%)',
    },
  },
}));

export default ({ images, onSelect, isLoading, cellHeight = 200, ...props }) => {
  const classes = useStyles();
  const onSelectById = (index) => () => onSelect(index);
  return (
    <GridList cellHeight={cellHeight} rows={2} cols={2} spacing={spacing} {...props}>
      <GridListTile rows={2} cols={1} onClick={onSelectById(0)}>
        <img className={classes.image} src={images[0]} alt=""/>
      </GridListTile>
      <GridListTile rows={2} cols={1}>
        <GridList cellHeight={cellHeight} spacing={spacing} rows={2} cols={2}>
          {images.slice(1, 5).map((image, index) => (
            <GridListTile
              key={index}
              onClick={onSelectById(index + 1)}
              cols={getCols(index, images)}
              rows={1}
            >
              <img className={classes.image} src={image} alt=""/>
            </GridListTile>
          ))}
        </GridList>
      </GridListTile>
    </GridList>
  );
};