import React from "react";
import Box from "@material-ui/core/Box";
import {PriceFilter} from "$app/components/searchPanel/FilterPanel";

export default (
  {
    onPriceRangeChange,
    currency,
    onCurrencyChange,
    isOwner,
    priceMin,
    priceMax,
    onIsOwnerFilterChange,
    embedded,
    altView,
    ...props
  }) => {
  const priceStyle = {
    display: 'flex',
    flexDirection: 'column-reverse',
    background: '#fff',
    borderRadius: '16px',
    position: embedded ? undefined : 'absolute',
    top: 350,
    left: embedded ? undefined : `calc(50vw - 460px)`,
    padding: embedded ? '24px 0' : '20px',
    boxShadow: embedded ? undefined : '0px 10px 20px rgba(0, 0, 0, 0.06)',
    zIndex: 1
  };
  return (
    <Box style={priceStyle}>
      <PriceFilter
        onPriceRangeChange={onPriceRangeChange}
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        isOwner={isOwner}
        from={priceMin}
        to={priceMax}
        onIsOwnerFilterChange={onIsOwnerFilterChange}
        altView
        {...props}
      >
      </PriceFilter>
    </Box>
  );
}