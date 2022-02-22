import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';

import FiltersBar from '$app/components/searchPanel/FiltersBar';
import FilterPanel from '$app/components/searchPanel/FilterPanel';
import {searchChangeOrder, searchLoadRealtyList} from '$app/redux/actions/apiActions';
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
  onFilterPanelDisplayChanged,
} from '$app/redux/actions/uiActions';

const useStyles = (barVisible) => makeStyles((theme) => ({
  panel: {
    borderRadius: 0,
    background: theme.palette.primary.gradient,
    padding: 16,
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
  openFilterPanel: {
    position: 'absolute',
    zIndex: 100,
    width: '575px',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'calc(100vh - 56px)',
  },
}));

function ResidentialComplexesFilterPanel(
  {
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
    isFilterPanelOpen,
    onDueDateChange,
    isFiltersPanelHidden = false,
    onFilterPanelDisplayChanged,
  }) {

  const styles = useStyles( isFilterPanelOpen)();

  return (
    <Slide
      in={!isFiltersPanelHidden}
      mountOnEnter
      unmountOnExit
      timeout={{enter: 100, exit: 100}}
    >
      <Paper className={styles.panel} elevation={0}>
        {!isFilterPanelOpen && (
          <FiltersBar
            priceMax={priceMax}
            priceMin={priceMin}
            currency={currency}
            rooms={rooms}
            onFilterPanelDisplayChange={onFilterPanelDisplayChanged}
          />
        )}
        {isFilterPanelOpen && (
          <FilterPanel
            rooms={rooms}
            isNotLastFloor={isNotLastFloor}
            isNotFirstFloor={isNotFirstFloor}
            currency={currency}
            isOwner={isOwner}
            priceMin={priceMin}
            priceMax={priceMax}
            sizeMin={sizeMin}
            sizeMax={sizeMax}
            searchCount={searchCount}
            onCurrencyChange={onCurrencyChange}
            onLastFloorFilterChange={onLastFloorFilterChange}
            onFirstFloorFilterChange={onFirstFloorFilterChange}
            onIsOwnerFilterChange={onIsOwnerFilterChange}
            onPriceRangeChange={onPriceRangeChange}
            onSizeRangeChange={onSizeRangeChange}
            onRoomFilterValueAdded={onRoomFilterValueAdded}
            onRoomFilterValueRemoved={onRoomFilterValueRemoved}
            onFilterPanelDisplayChange={onFilterPanelDisplayChanged}
            onDueDateChange={onDueDateChange}
          />
        )}
      </Paper>
    </Slide>
  );
}

const mapStateToProps = function ({search, filters, ui}) {
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
    isFilterPanelOpen: ui.isFilterPanelOpen,
  };
};
const mapDispatchToProps = {
  onListFlatHighlighted,
  onFilterPanelDisplayChanged,
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
