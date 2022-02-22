import React, { useCallback } from 'react';
import { Marker } from 'react-map-gl';
import { makeStyles } from '@material-ui/core';
import {useTheme} from "@material-ui/core/styles";

import { formatToCorrectPrice } from '$app/utlis/price';
import { currencies } from '$js/config';

const getPriceString = (properties) => {
  if (!properties) {
    return 0;
  }

  switch (properties.currency) {
    case currencies.usd.value:
      return `${formatToCorrectPrice(properties.price)} ${currencies.usd.symbol}`;
    case currencies.sum.value:
      return `${formatToCorrectPrice(properties.price)} ${currencies.sum.symbol}`;
    default:
      return '0';
  }
};

const useStyles = makeStyles({
  container: {
    transform: 'translate(-50%, -110%)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    backgroundColor: (props) => props.label.backgroundColor,
    color: (props) => props.label.color,
    padding: 4,
    borderRadius: 12,
    fontSize: 12,
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.24)',
  },
});

const RealtyMarker = ({
  feature,
  onMapRealtySelected,
  highlightedFlatId,
  selectedMapGeohash,
}) => {
  const theme = useTheme();

  const { geometry, properties } = feature;
  const isHighlighted = properties.id === highlightedFlatId || properties.id === selectedMapGeohash;
  const styleProps = {
    label: {
      backgroundColor: isHighlighted ? '#FFE36F' : theme.palette.secondary.main,
      color: isHighlighted ? '#1F2229' : '#FFF',
    },
  };
  const classes = useStyles(styleProps);

  const handleMapFlatSelected = useCallback(() => {
    onMapRealtySelected(properties.id);
  }, [onMapRealtySelected, properties.id]);

  return (
    <Marker
      key={properties.id}
      longitude={geometry.coordinates[0]}
      latitude={geometry.coordinates[1]}
      captureDrag={false}
      captureDoubleClick={false}
    >
      <div className={classes.container} onClick={handleMapFlatSelected}>
        <div className={classes.label}>
          <span style={{ padding: '0 6px' }}>{getPriceString(properties)}</span>
        </div>
        <svg height="5px" width="10px">
          <polygon fill={isHighlighted ? '#FFE36F' : theme.palette.secondary.main} points="0,0 10,0 5,5" />
        </svg>
      </div>
    </Marker>
  );
};

export default RealtyMarker;
