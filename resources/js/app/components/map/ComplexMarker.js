import React, { useCallback } from 'react';
import { Marker } from 'react-map-gl';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import classNames from 'classnames';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { formatToCurrencyPrice } from '$app/utlis/price';
import BusinessIcon from '@material-ui/icons/Business';

const useStyles = makeStyles({
  root: {
    transform: 'translate(-50%, -110%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  markerContainer: {
    color: '#02A3BB',
    background: '#02A3BB',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.24)',
    cursor: 'pointer',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
  },
  iconContainer: {
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    background: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 4px 4px 2px',
    '& svg': {
      fontSize: 16
    }
  },
  text: {
    color: '#ffffff',
    marginLeft: '6px',
    marginRight: '6px',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
  },
  highlightedBackground: {
    background: '#FFE36F',
    color: '#54606A',
  },
  highlightedText: {
    fontWeight: 'unset',
    color: '#1F2229',
    marginBottom: '-1px',
  },
  highlightedIcon: {
    color: '#FFE36F',
  },
  verified: {
    background: '#FF8C27',
    color: '#FF8C27',
  },
});

const ResidentialComplexMarkerView = ({
  feature: { properties },
  feature,
  onSelected,
  isHighlighted,
  ...props
}) => {
  const classes = useStyles();

  const handleOnSelected = useCallback(() => {
    onSelected(properties.id);
  }, [onSelected, properties.id]);

  return (
    <div className={`${classes.root}`}>
      <div
        className={classNames(classes.markerContainer, {
          [classes.highlightedBackground]: isHighlighted,
        })}
        onClick={handleOnSelected}
        {...props}
      >
        <div className={classNames(classes.iconContainer, isHighlighted && classes.highlightedIcon)}>
          <BusinessIcon />
        </div>
        <div className={classNames(classes.text, isHighlighted && classes.highlightedText)}>
          <Trans>from</Trans>{' '} {formatToCurrencyPrice(properties.price, properties.currency)}
        </div>
      </div>
      <svg height="5px" width="10px">
        <polygon fill={isHighlighted ? '#FFE36F' : '#02A3BB'} points="0,0 10,0 5,5" />
      </svg>
    </div>
  );
};

const ComplexMarker = ({ feature, feature: { geometry, properties }, ...props }) => {
  return (
    <Marker
      key={properties.id}
      longitude={geometry.coordinates[0]}
      latitude={geometry.coordinates[1]}
      captureDrag={false}
      captureDoubleClick={false}
    >
      <ResidentialComplexMarkerView feature={feature} {...props} />
    </Marker>
  );
};

export default ComplexMarker;
