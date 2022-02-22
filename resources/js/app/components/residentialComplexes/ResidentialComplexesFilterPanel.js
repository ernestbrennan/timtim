import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from '../searchPanel/SearchBar';
import FiltersBar from '../searchPanel/FiltersBar';
import GeofilterPanel from '../searchPanel/GeofilterPanel';
import FilterPanel from '../searchPanel/FilterPanel';
import { searchChangeOrder, searchLoadRealtyList } from '$app/redux/actions/apiActions';
import {
  onDueDateChange,
  onCurrencyChange,
  onFirstFloorFilterChange,
  onIsOwnerFilterChange,
  onLastFloorFilterChange,
  onListFlatHighlighted,
  onMapRealtySelected,
  onPriceRangeChange,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onSizeRangeChange,
} from '$app/redux/actions/uiActions';

const useStyles = (barVisible) =>
  makeStyles((theme) => ({
    panel: {
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      padding: 16,
      [theme.breakpoints.down('sm')]: {
        padding: 16,
        minHeight: '130px',
      },
      minHeight: '110px',
      boxSizing: 'border-box',
      height: barVisible ? '100%' : 'initial',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    openFilterPanel: {
      position: 'absolute',
      zIndex: 100,
      width: '575px',
      maxWidth: '100%',
      height: '100%',
      maxHeight: 'calc(100vh - 56px)',
    },
  }));

function ResidentialComplexesFilterPanel({
  isOwner,
  currency,
  priceMax,
  priceMin,
  sizeMax,
  sizeMin,
  searchCount,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onPriceRangeChange,
  onSizeRangeChange,
  onCurrencyChange,
  onIsOwnerFilterChange,
  onLastFloorFilterChange,
  onFirstFloorFilterChange,
  rooms,
  isNotLastFloor,
  isNotFirstFloor,
  onDueDateChange,
  isFiltersPanelHidden = false,
  onFiltersDisplayChange,
  isFilterPanelInitiallyOpen = false,
}) {
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(isFilterPanelInitiallyOpen);
  const [isGeoFilterPanelOpen, setGeoFilterPanelOpen] = useState(false);
  const styles = useStyles(isGeoFilterPanelOpen || isFilterPanelOpen)();
  const changeFilterPanelDisplay = useCallback(
    (value) => {
      setFilterPanelOpen(value);
      setGeoFilterPanelOpen(false);
      onFiltersDisplayChange(value);
    },
    [onFiltersDisplayChange],
  );

  const changeGeoFilterPanelDisplay = useCallback(
    (value) => {
      setGeoFilterPanelOpen(value);
      setFilterPanelOpen(false);
      onFiltersDisplayChange(value);
    },
    [onFiltersDisplayChange],
  );

  const isFilterBarVisible = !(isGeoFilterPanelOpen || isFilterPanelOpen);

  return (
    <Slide
      in={!isFiltersPanelHidden}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 100, exit: 100 }}
    >
      <Paper className={styles.panel} elevation={0}>
        <SearchBar onClick={() => changeGeoFilterPanelDisplay(true)}/>
        {isFilterBarVisible && (
          <FiltersBar
            priceMax={priceMax}
            priceMin={priceMin}
            currency={currency}
            rooms={rooms}
            onFilterPanelDisplayChange={changeFilterPanelDisplay}
          />
        )}
        {isGeoFilterPanelOpen && (
          <GeofilterPanel
            searchCount={searchCount}
            onGeofilterPanelDisplayChange={changeGeoFilterPanelDisplay}
          />
        )}
        {isFilterPanelOpen && (
          <FilterPanel
            rooms={rooms}
            onRoomFilterValueAdded={onRoomFilterValueAdded}
            onRoomFilterValueRemoved={onRoomFilterValueRemoved}
            isNotLastFloor={isNotLastFloor}
            isNotFirstFloor={isNotFirstFloor}
            onLastFloorFilterChange={onLastFloorFilterChange}
            onFirstFloorFilterChange={onFirstFloorFilterChange}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            isOwner={isOwner}
            onIsOwnerFilterChange={onIsOwnerFilterChange}
            onPriceRangeChange={onPriceRangeChange}
            onSizeRangeChange={onSizeRangeChange}
            priceMin={priceMin}
            priceMax={priceMax}
            sizeMin={sizeMin}
            sizeMax={sizeMax}
            searchCount={searchCount}
            onFilterPanelDisplayChange={changeFilterPanelDisplay}
            onDueDateChange={onDueDateChange}
          />
        )}
      </Paper>
    </Slide>
  );
}

const mapStateToProps = function ({ search, filters }) {
  return {
    selectedFilter: search.activeUIRegionFilter,
    searchCount: search.count,
    searchId: search.searchId,
    rooms: filters.rooms,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sizeMin: filters.sizeMin,
    sizeMax: filters.sizeMax,
    isNotLastFloor: filters.isNotLastFloor,
    isNotFirstFloor: filters.isNotFirstFloor,
    currency: filters.currency,
    isOwner: filters.isOwner,
    searchOrder: search.order,
  };
};
const mapDispatchToProps = {
  onListFlatHighlighted,
  onMapRealtySelected,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onPriceRangeChange,
  onSizeRangeChange,
  onCurrencyChange,
  onIsOwnerFilterChange,
  onLastFloorFilterChange,
  onFirstFloorFilterChange,
  searchLoadRealtyList,
  searchChangeOrder,
  onDueDateChange: onDueDateChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResidentialComplexesFilterPanel);
