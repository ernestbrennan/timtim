import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactMapGL from 'react-map-gl';
import {makeStyles} from '@material-ui/core';

import { setMapLanguage } from '../map/helpers';

import { getGeoFeatureFromRealEstateComplex } from '$app/utlis/realEstateDevelopers';
import RealtyMarker from '$app/components/map/RealtyMarker';
import ComplexMarker from '$app/components/map/ComplexMarker';
import { mapboxToken, currencies } from '$js/config';
import CloseIcon from '$app/icons/CloseIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapContainer: {
    maxWidth: 800,
    maxHeight: 600,
    width: '100%',
    height: '100%',
  },
  close: {
    top: 25,
    right: 25,
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 16,
  },
}));

const MapSnippet = ({ data, type = 'realty' }) => {
  const classes = useStyles();
  const language = useSelector((state) => state.ui.language);

  const [viewport, setViewport] = useState(() => {
    if (type === 'realty') {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        zoom: 16,
      };
    } else {
      return {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
        zoom: 16,
      };
    }
  });

  const mapCurrency = currencies.sum.value;

  const onMapViewportChange = useCallback(
    ({ width, height, ...rest }) => setViewport(rest),
    [setViewport],
  );

  const handleMapOnLoad = useCallback((event) => {
    setMapLanguage(event, language)
  }, [language]);

  return (
    <div className={classes.root}>
      <Link to={(location) => `${location.pathname.replace('map/', '')}`}>
        <div className={classes.close}>
          <CloseIcon />
        </div>
      </Link>
      <div className={classes.mapContainer}>
        <ReactMapGL
          mapboxApiAccessToken={mapboxToken}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/kelyanmedia/ckq13vomx07y017nie0wxjol1"
          // mapStyle="mapbox://styles/wrenchtech/cjnbijdyp5z8f2rleqgbm4bf5"
          onViewportChange={onMapViewportChange}
          onLoad={handleMapOnLoad}
          {...viewport}
        >
          {type === 'realty' ? (
            <RealtyMarker
              feature={data.additional_info}
              onMapRealtySelected={() => ({})}
              currency={mapCurrency}
            />
          ) : (
            <ComplexMarker
              feature={getGeoFeatureFromRealEstateComplex(data)}
              onSelected={() => ({})}
              currency={mapCurrency}
            />
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default MapSnippet;
