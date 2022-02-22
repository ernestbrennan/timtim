import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import FilterPanel from './FilterPanel';
import SearchComplexList from '$app/components/complex-list/SearchComplexList'
import SelectedComplexList from '$app/components/complex-list/SelectedComplexList'
import {
  onDueDateChange,
  onActiveUIRegionFilterChanged,
  onCurrencyChange,
  onFilterPanelDisplayChanged,
  onFilterPanelVisibilityChangeRequest,
  onFirstFloorFilterChange,
  onGeofilterPanelDisplayChanged,
  onHideFavorites,
  onLastFloorFilterChange,
  onGeoZoomSelected,
  onListFlatHighlighted,
  onMapRealtySelected,
  onPriceRangeChange,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onSizeRangeChange,
  showRealtyAdvertiser,
} from '$app/redux/actions/uiActions';
import {
  addToFavorites,
  removeFromFavorites,
  searchChangeOrder,
  searchLoadRealtyList,
} from '$app/redux/actions/apiActions';

const useStyles = (barVisible) =>
  makeStyles((theme) => ({
    root: {
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      flexGrow: 1,
    },
    panel: {
      borderRadius: 0,
      background: theme.palette.primary.gradient,
      padding: 20,
      [theme.breakpoints.down('sm')]: {
        padding: 16,
        minHeight: '130px',
      },
      boxSizing: 'border-box',
      height: barVisible ? '100%' : 'initial',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    mapContainer: {
      flexGrow: 1,
    },
  }));

const SearchPanel = React.memo((
  {
    selectedMapFlatGeohash,
    isFilterPanelOpen,
    complexList,
    complexPagination,
    complexListHighlightedId,
    advType,
    searchLoadRealtyList,
    searchOrder,
    realtyAdvertiser,
    isAuthenticated,
    isFiltersPanelHidden,
    searchChangeOrder,
    favorites,
    localFavorites,
    onListFlatHighlighted,
    onMapRealtySelected,
    onCurrencyChange,
    onFilterPanelVisibilityChangeRequest,
    showRealtyAdvertiser,
    shownPhonesByFlatId,
    onGeoZoomSelected,
    addToFavorites,
    removeFromFavorites,
  }) => {
  const accountFavorites = isAuthenticated ? favorites : new Set(localFavorites);

  const handleSearchListScrollUp = () => {
    if (isFiltersPanelHidden || true) {
      onFilterPanelVisibilityChangeRequest(false);
    }
  };

  const handleSearchListScrollDown = () => {
    if (!isFiltersPanelHidden || true) {
      onFilterPanelVisibilityChangeRequest(true);
    }
  };

  return (
    <>
      {!selectedMapFlatGeohash && <FilterPanel/>}

      {!isFilterPanelOpen && (selectedMapFlatGeohash ? (
        <SelectedComplexList/>
      ) : (
        <SearchComplexList
          complexList={complexList}
          complexPagination={complexPagination}
          searchOrder={searchOrder}
          favorites={accountFavorites}

          onScrollUp={handleSearchListScrollUp}
          onScrollDown={handleSearchListScrollDown}
          onListFlatHighlighted={onListFlatHighlighted}
          onOrderChanged={searchChangeOrder}
          isFiltersPanelHidden={isFiltersPanelHidden}
          onLandlordProfileSelected={showRealtyAdvertiser}
          shownPhonesByFlatId={shownPhonesByFlatId}
          onGeoZoomSelected={onGeoZoomSelected}
          onAddToFavorites={addToFavorites}
          onRemoveFromFavorites={removeFromFavorites}
          onAdvertiserProfileSelected={showRealtyAdvertiser}
        />
      ))}
    </>
  );
  },
);
const mapStateToProps = function ({search, ui, filters, auth, realty}) {
  return {
    complexList: search.complexList,
    complexPagination: search.complexPagination,
    complexListHighlightedId: search.complexListHighlightedId,

    isFilterPanelOpen: ui.isFilterPanelOpen,
    isFiltersPanelHidden: ui.isFiltersPanelHidden,
    favorites: search.favorites,
    localFavorites: search.localFavorites,
    selectedMapFlatGeohash: search.selectedMapFlatGeohash,

    currency: filters.currency,
    searchOrder: search.order,
    shownPhonesByFlatId: ui.shownPhonesByFlatId,
  };
};

export default connect(mapStateToProps, {
  onListFlatHighlighted,
  onMapRealtySelected,
  onCurrencyChange,
  searchLoadRealtyList,
  searchChangeOrder,
  onFilterPanelVisibilityChangeRequest,
  showRealtyAdvertiser,
  onGeoZoomSelected,
  addToFavorites,
  removeFromFavorites,
})(SearchPanel);
