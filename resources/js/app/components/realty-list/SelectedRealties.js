import React, {useState, useEffect} from 'react';
import {FixedSizeList} from 'react-window';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AutoSizer from 'react-virtualized-auto-sizer';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

import RealtyListItem from './RealtyListItem';
import {getById} from '$app/api/realty';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px 0 8px',
    // marginBottom: 8,
    flexGrow: 1,
  },
  panel: {
    background: theme.palette.primary.gradient,
    marginTop: -8,
    borderRadius: '0 0 16px 16px',
    padding: 16,
    paddingTop: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  street: {
    fontSize: 18,
    color: theme.palette.primary.white,
    letterSpacing: -0.19,
    lineHeight: '20px',
    textAlign: 'left',
    paddingLeft: 10,
  },
  subway: {
    fontSize: 13,
    color: theme.palette.primary.white,
    letterSpacing: -0.14,
    lineHeight: '22px',
    textAlign: 'left',
    paddingLeft: 10,
  },
  closeBtn: {
    cursor: 'pointer',
    background: '#ECECEC',
    color: theme.palette.primary.main,
    '&:hover': {
      background: '#ECECEC',
    }
  }
}));

export default (
  {
    geohash,
    onListFlatHighlighted,
    onMapRealtySelected,
    shownPhonesByFlatId,
    onGeoZoomSelected,
    onAddToFavorites,
    onRemoveFromFavorites,
    favorites,
    onAdvertiserProfileSelected
  }
) => {

  const [count, setCount] = useState(50);
  const [items, setItems] = useState([]);

  useEffect(async () => {

    const {results} = await getById(geohash);

    setItems([results]);
    setCount(1);

  }, [geohash]);

  const classes = useStyles();

  const getAddress = (realty) => {
    if (!realty) {
      return '';
    }

    return realty.address_row;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <div className={classes.address}>
          <div className={classes.street}>{getAddress(items[0])}</div>
        </div>
        <IconButton
          className={classes.closeBtn}
          onClick={() => {
            onMapRealtySelected(null);
          }}
        >
          <CloseIcon/>
        </IconButton>
      </Paper>
      <AutoSizer>
        {({width, height}) => (
          <FixedSizeList
            className="List"
            height={height - 65}
            width={width}
            isItemLoaded={(index) => !!items[index]}
            itemCount={count}
            itemSize={211}
            itemData={{
              items,
              onHighlight: (id) => onListFlatHighlighted(id),
              shownPhonesByFlatId,
              onAdvertiserProfileSelected: onAdvertiserProfileSelected,
              onGeoZoomSelected: onGeoZoomSelected,
              onAddToFavorites: onAddToFavorites,
              onRemoveFromFavorites: onRemoveFromFavorites,
              favorites: favorites,
            }}
          >
            {RealtyListItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}
