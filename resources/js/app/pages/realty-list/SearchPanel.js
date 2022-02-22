import React, {useCallback, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {SwipeableDrawer} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';

import SearchRealties from '$app/components/realty-list/SearchRealties';
import SelectedRealties from '$app/components/realty-list/SelectedRealties';
import AdvertiserProfile from '$app/components/realty-list/AdvertiserProfile';

import Routes from '$app/utlis/routes';
import {advTypes} from '$js/utils/realty'
import {currencies} from '$js/config'
import FilterPanel from './FilterPanel'
import {
  onAdvTypeChanged,
  onCurrencyChange,
  onFilterPanelVisibilityChangeRequest,
  onGeoZoomSelected,
  onListFlatHighlighted,
  onMapRealtySelected,
  showRealtyAdvertiser,
} from '$app/redux/actions/uiActions';
import {
  addToFavorites,
  removeFromFavorites,
  searchChangeOrder,
  searchLoadRealtyList,
} from '$app/redux/actions/apiActions';

const SearchPanel = React.memo((
  {
    realtyList,
    realtyPagination,
    searchId,
    advType,
    searchLoadRealtyList,
    searchOrder,
    realtyAdvertiser,
    isAuthenticated,
    isFiltersPanelHidden,
    searchChangeOrder,
    favorites,
    localFavorites,
    isFilterPanelOpen,
    onListFlatHighlighted,
    selectedMapFlatGeohash,
    onMapRealtySelected,
    onCurrencyChange,
    onFilterPanelVisibilityChangeRequest,
    showRealtyAdvertiser,
    shownPhonesByFlatId,
    onGeoZoomSelected,
    onAdvTypeChanged,
    addToFavorites,
    removeFromFavorites,
  }) => {
    const theme = useTheme();
    const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));

    const location = useLocation();
    const dispatch = useDispatch();

    const accountFavorites = isAuthenticated ? favorites : new Set(localFavorites);

    useEffect(() => {
      let locationAdvType;
      let currency;
      if (location.pathname.includes(Routes.rent) || location.pathname === Routes.index) {
        locationAdvType = advTypes.rent;
        currency = currencies.sum.value;
      } else if (location.pathname.includes(Routes.sale)) {
        locationAdvType = advTypes.sale;
        currency = currencies.usd.value;
      }
      if (advType !== locationAdvType) {
        onAdvTypeChanged(locationAdvType);
      }
      dispatch(onCurrencyChange(currency));
    }, [location.pathname, onAdvTypeChanged, advType, dispatch, onCurrencyChange]);

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
          <SelectedRealties
            searchId={searchId}
            geohash={selectedMapFlatGeohash}
            favorites={accountFavorites}
            shownPhonesByFlatId={shownPhonesByFlatId}

            onAdvertiserProfileSelected={showRealtyAdvertiser}
            onListFlatHighlighted={onListFlatHighlighted}
            onMapRealtySelected={onMapRealtySelected}
            onLandlordProfileSelected={showRealtyAdvertiser}
            onGeoZoomSelected={onGeoZoomSelected}
            onAddToFavorites={addToFavorites}
            onRemoveFromFavorites={removeFromFavorites}
          />
        ) : (
          <SearchRealties
            realtyList={realtyList}
            realtyPagination={realtyPagination}
            loadRealtyList={searchLoadRealtyList}
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

        {!isDesktopView && (
          <SwipeableDrawer
            anchor="bottom"
            open={realtyAdvertiser !== null}
            onOpen={() => ({})}
            onClose={() => {
              showRealtyAdvertiser(null);
            }}
          >
            <AdvertiserProfile advertiser={realtyAdvertiser}/>
          </SwipeableDrawer>
        )}

        {isDesktopView && (
          <Dialog
            aria-labelledby="landlord modal"
            aria-describedby="landlord contact information"
            open={realtyAdvertiser !== null}
            onClose={() => {
              showRealtyAdvertiser(null);
            }}
          >
            <AdvertiserProfile advertiser={realtyAdvertiser}/>

          </Dialog>
        )}
      </>
    );
  },
);
const mapStateToProps = function ({search, ui, filters, auth, realty}) {
  return {
    realtyList: search.realtyList,
    realtyPagination: search.realtyPagination,
    realtyAdvertiser: ui.realtyAdvertiser,
    searchCount: search.pagination?.total,
    searchId: search.searchId,
    isFilterPanelOpen: ui.isFilterPanelOpen,
    isFiltersPanelHidden: ui.isFiltersPanelHidden,
    favorites: search.favorites,
    localFavorites: search.localFavorites,
    isAuthenticated: auth.isAuthenticated,
    selectedMapFlatGeohash: search.selectedMapFlatGeohash,
    currency: filters.currency,
    advType: filters.advType,
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
  onAdvTypeChanged,
  addToFavorites,
  removeFromFavorites,
})(SearchPanel);
