import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import FiltersBar from "$app/components/searchPanel/FiltersBar";
import FilterPanel from "$app/components/searchPanel/FilterPanel";
import React from "react";

import {connect} from "react-redux";
import {
  onDueDateChange,
  onCurrencyChange,
  onFilterPanelDisplayChanged,
  onFirstFloorFilterChange,
  onIsOwnerFilterChange,
  onLastFloorFilterChange,
  onPriceRangeChange,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onSizeRangeChange,
  onRealtyTypesSelectChange,
  onRealtyTypesReset
} from '$app/redux/actions/uiActions';

import {makeStyles} from "@material-ui/core/styles";

const useStyles = (barVisible) => makeStyles((theme) => ({
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

function RealtyListFilterPanel(
  {
    rooms,
    currency,
    priceMax,
    priceMin,
    sizeMax,
    sizeMin,
    isOwner,
    isNotLastFloor,
    isNotFirstFloor,
    isFiltersPanelHidden,
    realtyTypes,
    realtyTypesSelected,
    isFilterPanelOpen,
    onFilterPanelDisplayChanged,
    onRoomFilterValueAdded,
    onRoomFilterValueRemoved,
    onPriceRangeChange,
    onSizeRangeChange,
    onCurrencyChange,
    onIsOwnerFilterChange,
    onLastFloorFilterChange,
    onFirstFloorFilterChange,
    onDueDateChange,
    onRealtyTypesSelectChange,
    onRealtyTypesReset,
  }) {
  const classes = useStyles(isFilterPanelOpen)();

  return (
    <Slide
      in={!isFiltersPanelHidden}
      mountOnEnter
      unmountOnExit
      timeout={{enter: 100, exit: 100}}
    >
      <Paper className={classes.panel} elevation={0}>

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
            realtyTypes={realtyTypes}
            realtyTypesSelected={realtyTypesSelected}
            currency={currency}
            priceMin={priceMin}
            priceMax={priceMax}
            sizeMin={sizeMin}
            sizeMax={sizeMax}
            isOwner={isOwner}
            isNotLastFloor={isNotLastFloor}
            isNotFirstFloor={isNotFirstFloor}
            onRoomFilterValueAdded={onRoomFilterValueAdded}
            onRoomFilterValueRemoved={onRoomFilterValueRemoved}
            onLastFloorFilterChange={onLastFloorFilterChange}
            onFirstFloorFilterChange={onFirstFloorFilterChange}
            onCurrencyChange={onCurrencyChange}
            onIsOwnerFilterChange={onIsOwnerFilterChange}
            onPriceRangeChange={onPriceRangeChange}
            onSizeRangeChange={onSizeRangeChange}
            onFilterPanelDisplayChange={onFilterPanelDisplayChanged}
            onDueDateChange={onDueDateChange}
            onRealtyTypesSelectChange={onRealtyTypesSelectChange}
            onRealtyTypesReset={onRealtyTypesReset}
          />
        )}
      </Paper>
    </Slide>
  )
}


const mapStateToProps = function ({search, ui, filters, auth, realty}) {
  return {
    isFilterPanelOpen: ui.isFilterPanelOpen,
    isFiltersPanelHidden: ui.isFiltersPanelHidden,
    rooms: filters.rooms,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sizeMin: filters.sizeMin,
    sizeMax: filters.sizeMax,
    isNotLastFloor: filters.isNotLastFloor,
    isNotFirstFloor: filters.isNotFirstFloor,
    currency: filters.currency,
    isOwner: filters.isOwner,
    realtyTypesSelected: filters.realtyTypesSelected,
    realtyTypes: realty.options?.types,
  };
};

export default connect(mapStateToProps, {
  onFilterPanelDisplayChanged,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onPriceRangeChange,
  onSizeRangeChange,
  onCurrencyChange,
  onIsOwnerFilterChange,
  onLastFloorFilterChange,
  onFirstFloorFilterChange,
  onDueDateChange,
  onRealtyTypesSelectChange,
  onRealtyTypesReset,
})(RealtyListFilterPanel);