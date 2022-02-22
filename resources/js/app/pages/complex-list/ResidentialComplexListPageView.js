import React, {Suspense, useCallback, useEffect, useState} from "react";
import {useTheme} from "@material-ui/styles";
import {useMediaQuery} from "@material-ui/core";
import {useLocation} from "react-router-dom";
import Loading from "$app/components/common/Loading";
import SelectedMapPinInfo from "$app/components/residentialComplexes/SelectedMapPinInfo";
import ResidentialComplexesFilterPanel from "$app/components/residentialComplexes/ResidentialComplexesFilterPanel";
import ShortAdvListWithShowMore from "$app/components/common/ShortAdvListWithShowMore";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import NoSearchResults from "$app/components/realty-list/NoSearchResults";
import Hidden from "@material-ui/core/Hidden";
import {MapType} from "$app/components/map/style";
import {makeStyles} from "@material-ui/core/styles";
import MapViewFC from '$app/components/map/MapViewFC';

const sideBarWidth = 596;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
  },
  sideBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      width: sideBarWidth,
      minWidth: sideBarWidth,
    },
    backgroundColor: '#F8F9FA',
  },
  mapContainer: {
    display: 'flex',
    flexGrow: 1,
  },
}));

function ResidentialComplexListPageView(
  {
    isFirstLoad,
    selectedListing,
    DataProviderWrapper,
    filteredItems,
    onMapPinInfoClose,
    searchCount,
    loadMoreItems,
    offset,
    onAddToFavorites,
    onRemoveFromFavorites,
    setOffset,
  }) {
  const styles = useStyles();
  const theme = useTheme();
  const isDesktopList = useMediaQuery(theme.breakpoints.up('sm'));

  const isFilterPanelInitiallyOpen = useLocation()?.state?.openFilters;
  const [showShowMoreButton, setShowShowMoreButton] = useState(true);
  const [isFirstOffset, setIsFirstOffset] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(isFilterPanelInitiallyOpen);

  const isItemLoaded = useCallback((index) => Boolean(filteredItems[index]), [filteredItems]);
  const itemSize = isDesktopList ? 207 : 449;

  useEffect(() => {
    !showShowMoreButton &&
    offset !== 20 &&
    offset !== 30 &&
    isFirstOffset &&
    setIsFirstOffset(false); //TODO: refactor scroll offset criteria
  }, [offset, isFirstOffset, showShowMoreButton]);

  return (
    <div className={styles.root}>
      <div className={styles.sideBar}>
        {(() => {
          if (isFirstLoad) {
            return <Loading/>;
          }
          if (selectedListing) {
            return (
              <SelectedMapPinInfo
                listing={selectedListing}
                onClose={onMapPinInfoClose}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
              />
            );
          }
          return (
            <>
              <ResidentialComplexesFilterPanel
                onFiltersDisplayChange={(value) => {
                  setIsFilterPanelOpen(value);
                }}
                isFilterPanelInitiallyOpen={isFilterPanelInitiallyOpen}
              />
              {!isFilterPanelOpen &&
              (() => {
                if (Boolean(filteredItems.length)) {
                  if (showShowMoreButton) {
                    return (
                      <ShortAdvListWithShowMore
                        itemCount={filteredItems.length}
                        DataProviderWrapper={DataProviderWrapper}
                        onShowMoreClick={() => {
                          setShowShowMoreButton(false);
                          setOffset(20);
                        }}
                        hideShowMore={searchCount <= 20}
                      />
                    );
                  } else {
                    return (
                      <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={searchCount}
                        loadMoreItems={loadMoreItems}
                        threshold={12}
                        minimumBatchSize={20}
                      >
                        {({onItemsRendered, ref}) => (
                          <AutoSizer>
                            {({height, width}) => (
                              <FixedSizeList
                                className="List"
                                height={height - 123}
                                itemCount={searchCount}
                                itemSize={itemSize}
                                width={width}
                                ref={ref}
                                overscanCount={2}
                                onItemsRendered={onItemsRendered}
                                initialScrollOffset={
                                  Math.max(offset - (isFirstOffset ? offset - 20 : 16), 0) *
                                  itemSize
                                }
                              >
                                {DataProviderWrapper}
                              </FixedSizeList>
                            )}
                          </AutoSizer>
                        )}
                      </InfiniteLoader>
                    );
                  }
                } else {
                  return <NoSearchResults/>;
                }
              })()}
            </>
          );
        })()}
      </div>
      <Hidden smDown>
        <div className={styles.mapContainer}>
          <Suspense fallback={<div/>}>
            <MapViewFC type={MapType.complexList}/>
          </Suspense>
        </div>
      </Hidden>
    </div>
  );
}

export default React.memo(ResidentialComplexListPageView);
