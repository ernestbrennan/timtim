import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import {ClickAwayListener, Drawer, useMediaQuery, useTheme} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Trans} from '@lingui/macro';

import PriceSelector from './PriceSelector'
import RoomsSelector from './RoomsSelector'
import TypeSelector from './TypeSelector'
import StyledButton from '$app/components/common/StyledButton';
import SearchBarSegment from './SearchBarSegment'
import Text from '$app/components/common/Text';
import {currencies} from '$js/config'

import {
  onAdvTypeChanged,
  onCurrencyChange,
  onFilterPanelDisplayChanged,
  onFirstFloorFilterChange,
  onIsOwnerFilterChange,
  onLastFloorFilterChange,
  onPriceRangeChange, onRealtyTypesSelectChange,
  onRoomFilterValueAdded,
  onRoomFilterValueRemoved,
  onSizeRangeChange,
} from '$app/redux/actions/uiActions';

import useStyles from './style';


const getRoomsText = (rooms) => {
  return rooms.length ? `${[...rooms].sort().join(', ')}-к` : <Trans>Rooms</Trans>;
};

const getPriceText = (priceMin, priceMax, currency) => {
  if (priceMin && priceMax) {
    return (
      <>
        <Trans>from</Trans>{' '}
        <NumberFormat value={priceMin} displayType={'text'} thousandSeparator={' '}/>{' '}
        <Trans>to</Trans>{' '}
        <NumberFormat value={priceMax} displayType={'text'} thousandSeparator={' '}/>{' '}
        {currencies[currency].label.toLowerCase()}
      </>
    );
  } else if (priceMin) {
    return (
      <>
        <Trans>from</Trans>{' '}
        <NumberFormat value={priceMin} displayType={'text'} thousandSeparator={' '}/>{' '}
        {currencies[currency].label.toLowerCase()}
      </>
    );
  } else if (priceMax) {
    return (
      <>
        <Trans>to</Trans>{' '}
        <NumberFormat value={priceMax} displayType={'text'} thousandSeparator={' '}/>{' '}
        {currencies[currency].label.toLowerCase()}
      </>
    );
  }
  return <Trans>Price</Trans>;
};

const getTypeText = (realtyTypes, realtyTypesSelected) => {

  return realtyTypesSelected.size
    ? `${realtyTypes.filter(i => realtyTypesSelected.has(i.value)).map(i => i.label).join(', ')}`
    : <Trans>Types</Trans>;
}

function SearchBar(
  {
    rooms,
    currency,
    isOwner,
    priceMax,
    priceMin,
    realtyTypes,
    realtyTypesSelected,
    onRoomFilterValueAdded,
    onRoomFilterValueRemoved,
    onPriceRangeChange,
    onRealtyTypesSelectChange,
    onCurrencyChange,
    onIsOwnerFilterChange,
    onApplySearch,
  }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showRoomsSelector, setShowRoomsSelector] = useState(false);
  const [showPriceSelector, setShowPriceSelector] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openRoomsSelector = useCallback(() => {
    setShowPriceSelector(false);
    setShowTypeSelector(false);
    setShowRoomsSelector((value) => !value);
    setDrawerOpen(true);
  }, []);

  const openPriceSelector = useCallback(() => {
    setShowTypeSelector(false);
    setShowRoomsSelector(false);
    setShowPriceSelector((value) => !value);
    setDrawerOpen(true);
  }, []);

  const openTypeSelector = useCallback(() => {
    setShowPriceSelector(false);
    setShowRoomsSelector(false);
    setShowTypeSelector((value) => !value);
    setDrawerOpen(true);
  }, []);

  const closeAllSelectors = useCallback(() => {
    setShowRoomsSelector(false);
    setShowPriceSelector(false);
    setShowTypeSelector(false);
    setDrawerOpen(false);
  }, []);

  return (
    <ClickAwayListener onClickAway={closeAllSelectors}>
      <Box style={{width: '100%'}}>
        <Box className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={3} className={classes.gridItem}>
              <SearchBarSegment text={getRoomsText(rooms)} onClick={openRoomsSelector} isOpen={showRoomsSelector}/>
            </Grid>
            <Grid item xs={12} lg={3} className={classes.gridItem}>
              <SearchBarSegment
                text={getPriceText(priceMin, priceMax, currency)}
                onClick={openPriceSelector}
                isOpen={showPriceSelector}
              />
            </Grid>
            <Grid item xs={12} lg={3} className={classes.gridItem}>
              <SearchBarSegment
                text={getTypeText(realtyTypes, realtyTypesSelected)}
                onClick={openTypeSelector}
                isOpen={showTypeSelector}
              />
            </Grid>
            <Grid item xs={12} lg={3} className={classes.gridItem}>
              <Box display={'flex'} style={{height: '100%'}}>
                <Button className={classes.searchBtn} onClick={onApplySearch}>
                  <Trans>Search</Trans>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {(() => {
          if (isMobile) {
            return (
              <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeAllSelectors}>
                {(() => {
                  if (showRoomsSelector) {
                    return (
                      <Box p={'32px 16px 16px 16px'}>
                        <Text size={20}>
                          <Trans>Rooms</Trans>
                        </Text>
                        <RoomsSelector
                          rooms={rooms}
                          onRoomFilterValueAdded={onRoomFilterValueAdded}
                          onRoomFilterValueRemoved={onRoomFilterValueRemoved}
                          embedded
                        >
                        </RoomsSelector>
                        <Button className={classes.doneButton} onClick={closeAllSelectors}>
                          <Trans>Done</Trans>
                        </Button>
                      </Box>
                    );
                  }
                  if (showPriceSelector) {
                    return (
                      <Box p={'32px 16px 16px 16px'}>
                        <Text size={20}>
                          <Trans>Price</Trans>
                        </Text>
                        <PriceSelector
                          onPriceRangeChange={onPriceRangeChange}
                          priceMax={priceMax}
                          priceMin={priceMin}
                          onCurrencyChange={onCurrencyChange}
                          currency={currency}
                          isOwner={isOwner}
                          onIsOwnerFilterChange={onIsOwnerFilterChange}
                          embedded
                          altView
                        >
                        </PriceSelector>

                        <Button className={classes.doneButton} onClick={closeAllSelectors}>
                          <Trans>Done</Trans>
                        </Button>
                      </Box>
                    );
                  }
                  if (showTypeSelector) {
                    return (
                      <Box p={'32px 16px 16px 16px'}>
                        <Text size={20}>
                          <Trans>Types</Trans>
                        </Text>

                        <TypeSelector
                          realtyTypes={realtyTypes}
                          realtyTypesSelected={realtyTypesSelected}
                          onRealtyTypesSelectChange={onRealtyTypesSelectChange}
                          embedded
                        />

                        <Button className={classes.doneButton} onClick={closeAllSelectors}>
                          <Trans>Done</Trans>
                        </Button>

                        {/*<StyledButton*/}
                        {/*  className={classes.button}*/}
                        {/*  onClick={closeAllSelectors}*/}
                        {/*  fullWidth*/}
                        {/*  altColor*/}
                        {/*  style={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.24)'}}*/}
                        {/*>*/}
                        {/*  <Trans>Done</Trans>*/}
                        {/*</StyledButton>*/}
                      </Box>
                    );
                  }
                })()}
              </Drawer>
            );
          } else {
            if (showRoomsSelector) {
              return (
                <RoomsSelector
                  rooms={rooms}
                  onRoomFilterValueAdded={onRoomFilterValueAdded}
                  onRoomFilterValueRemoved={onRoomFilterValueRemoved}
                >
                </RoomsSelector>
              );
            }
            if (showPriceSelector) {
              return (
                <PriceSelector
                  priceMax={priceMax}
                  priceMin={priceMin}
                  currency={currency}
                  isOwner={isOwner}
                  onIsOwnerFilterChange={onIsOwnerFilterChange}
                  onPriceRangeChange={onPriceRangeChange}
                  onCurrencyChange={onCurrencyChange}
                >
                </PriceSelector>
              );
            }
            if (showTypeSelector) {
              return (
                <TypeSelector
                  realtyTypes={realtyTypes}
                  realtyTypesSelected={realtyTypesSelected}
                  onRealtyTypesSelectChange={onRealtyTypesSelectChange}
                />
              );
            }
          }
        })()}
      </Box>
    </ClickAwayListener>
  );
}

export default connect(({filters, realty}) => {
    return {
      realtyTypes: realty.options?.types,
      realtyTypesSelected: filters.realtyTypesSelected,
      rooms: filters.rooms,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      sizeMin: filters.sizeMin,
      sizeMax: filters.sizeMax,
      currency: filters.currency,
      isOwner: filters.isOwner,
    };
  },
  {
    onFilterPanelDisplayChanged,
    onRoomFilterValueAdded,
    onRoomFilterValueRemoved,
    onPriceRangeChange,
    onSizeRangeChange,
    onCurrencyChange,
    onIsOwnerFilterChange,
    onLastFloorFilterChange,
    onFirstFloorFilterChange,
    onAdvTypeChanged,
    onRealtyTypesSelectChange,
  },
)(SearchBar);
