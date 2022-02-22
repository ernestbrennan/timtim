import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FixedSizeList} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Grid, MenuItem, Select} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AutoSizer from 'react-virtualized-auto-sizer';
import {Trans} from '@lingui/macro';

import ComplexListItem from './ComplexListItem';
import NoSearchResults from './NoSearchResults';
import ShortAdvListWithShowMore from '$app/components/common/ShortAdvListWithShowMore';
import {formatPrice} from '$app/utlis/price';
import {searchSortOrders} from '$app/redux/reducers/search';
import RealtyListItem from "$app/components/realty-list/RealtyListItem";

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
    complexList,
    complexPagination,
    loadComplexList,
    searchOrder,
    onListFlatHighlighted,
    favorites,
    onOrderChanged,
    onScrollUp,
    onScrollDown,
    onFlatImagesSelected,
    onLandlordProfileSelected,
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
  const advType = useSelector((state) => state.filters.advType);
  const isDesktopList = useMediaQuery(theme.breakpoints.up('sm'));
  const isItemLoaded = (index) => !!(complexList && complexList[index]);
  const [showShowMoreButton, setShowShowMoreButton] = useState(true);
  const handleScroll = ({scrollDirection, scrollOffset}) => {
    if (scrollDirection === 'forward' && scrollOffset > 250 && onScrollDown) {
      onScrollDown();
    } else if (scrollDirection === 'backward' && onScrollUp) {
      onScrollUp();
    }
  };
  const itemHeight = useMemo(() => (isDesktopList ? 212 : 427), [isDesktopList]);

  const DataProviderWrapper = useCallback(({index, style}) => {

      if (!complexList[index]) {
        return <RealtyListItem data={{}} style={style} index={index}/>;
      }

      const itemId = complexList[index]?.id;
      const isFavorite = favorites.has(String(itemId)) || favorites.has(itemId);

      return (
        <ComplexListItem
          complex={complexList[index]}
          isFavorite={isFavorite}

          onHighlight={onListFlatHighlighted}
          onGeoZoomSelected={onGeoZoomSelected}
          onAddToFavorites={onAddToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
          style={style}
          index={index}
        />
      )
    }, [
      favorites,
      complexList,
      onAddToFavorites,
      onGeoZoomSelected,
      onListFlatHighlighted,
      onRemoveFromFavorites,
      itemHeight,
    ],
  );

  if (listRef.current && !complexList.length) {
    listRef.current.scrollToItem(0);
  }

  const isFirstLoaded = complexPagination.total !== undefined;

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
          <Trans>Found {complexPagination.total || 0} complexes</Trans>
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
      {complexPagination.total !== undefined && !complexPagination.total && <NoSearchResults/>}
      {complexPagination.total > 0 && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={complexPagination.total}
          minimumBatchSize={15}
          loadMoreItems={(start, end) => {
            // loadComplexList(start, end);
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
                  itemCount={complexPagination.total}
                  itemSize={itemHeight}

                  // initialScrollOffset={20 * itemHeight}
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
