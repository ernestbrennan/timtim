import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FixedSizeList} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Grid, MenuItem, Select} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AutoSizer from 'react-virtualized-auto-sizer';
import {Trans} from '@lingui/macro';

import RealtyListItem from './RealtyListItem';
import NoSearchResults from './NoSearchResults';
import ShortAdvListWithShowMore from '$app/components/common/ShortAdvListWithShowMore';
import {searchSortOrders} from '$app/redux/reducers/search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px 0 0 0',
    flexGrow: 1,
  },
  sortContainer: {
    padding: '0 16px',
    fontSize: 13,
  },
  sortSelector: {
    fontSize: 13,
    fontWeight: 700,
    marginTop: 2,
  },
  select: {
    paddingRight: 22,
  },
}));

export default React.memo((
  {
    realtyList,
    realtyPagination,
    loadRealtyList,
    searchOrder,
    onListFlatHighlighted,
    onOrderChanged,
    onScrollUp,
    onScrollDown,
    shownPhonesByFlatId,
    onGeoZoomSelected,
    onAddToFavorites,
    onRemoveFromFavorites,
    onAdvertiserProfileSelected
  }
) => {
  const classes = useStyles();
  const listRef = useRef();
  const theme = useTheme();
  const isDesktopList = useMediaQuery(theme.breakpoints.up('sm'));
  const isItemLoaded = (index) => !!(realtyList && realtyList[index]);
  const favorites = useSelector((state) => state.search.favorites);
  const handleScroll = ({scrollDirection, scrollOffset}) => {
    if (scrollDirection === 'forward' && scrollOffset > 250 && onScrollDown) {
      onScrollDown();
    } else if (scrollDirection === 'backward' && onScrollUp) {
      onScrollUp();
    }
  };
  const itemHeight = useMemo(() => (isDesktopList ? 212 : 427), [isDesktopList]);

  const DataProviderWrapper = useCallback(({index, style}) => {

      if (!realtyList[index]) {
        return <RealtyListItem data={{}} style={style} index={index}/>;
      }

      const itemId = realtyList[index]?.id;
      const isFavorite = favorites.has(String(itemId)) || favorites.has(itemId);

      return (
        <RealtyListItem
          style={style}
          index={index}
          realty={realtyList[index]}
          isFavorite={isFavorite}
          onHighlight={onListFlatHighlighted}
          shownPhonesByFlatId={shownPhonesByFlatId}
          onAdvertiserProfileSelected={onAdvertiserProfileSelected}
          onGeoZoomSelected={onGeoZoomSelected}
          onAddToFavorites={onRemoveFromFavorites}
        />
      )
    },
    [
      favorites,
      realtyList,
      onAddToFavorites,
      onGeoZoomSelected,
      onListFlatHighlighted,
      onRemoveFromFavorites,
      shownPhonesByFlatId,
      itemHeight,
    ],
  );

  if (listRef.current && !realtyList.length) {
    listRef.current.scrollToItem(0);
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
        className={classes.sortContainer}
      >
        <Grid item>
          <Trans>Found {realtyPagination.total || 0} apartments</Trans>
        </Grid>
        <Grid item>
          <Select
            value={searchOrder}
            disableUnderline
            autoWidth
            classes={{root: classes.sortSelector, select: classes.select}}
            onChange={(e) => onOrderChanged(e.target.value)}
          >
            <MenuItem value={searchSortOrders.date}>
              <Trans>By date</Trans>
            </MenuItem>
            <MenuItem value={searchSortOrders.priceAsc}>
              <Trans>By price asc</Trans>
            </MenuItem>
            <MenuItem value={searchSortOrders.priceDesc}>
              <Trans>By price desc</Trans>
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      {realtyPagination.total === 0 && <NoSearchResults/>}
      {realtyPagination.total > 0 && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={realtyPagination.total > realtyList.length ? realtyList.length + 2 : realtyList.length}
          minimumBatchSize={15}
          loadMoreItems={(start, end) => {
            if (end > 15){
              loadRealtyList(realtyPagination.page + 1);
            }
          }}
        >
          {({onItemsRendered}) => (
            <AutoSizer>
              {({width, height}) => (
                <FixedSizeList
                  className="List"
                  height={height - 20}
                  width={width}
                  onScroll={handleScroll}
                  itemCount={realtyList.length}
                  itemSize={itemHeight}
                  onItemsRendered={onItemsRendered}
                  ref={listRef}
                >
                  {DataProviderWrapper}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </div>
  );
});
