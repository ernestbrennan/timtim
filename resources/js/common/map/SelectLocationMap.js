import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {FlyToInterpolator, Marker} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import WebMercatorViewport from "viewport-mercator-project";

import LocationCity from '@material-ui/icons/LocationCity';
import {mapboxToken, currencies} from '$js/config';
import {defaultViewport} from "$app/components/map/style";
import {setMapLanguage} from './helpers';

export default ({height, bbox, latitude, longitude, setLngLat}) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(defaultViewport);

  const zoomToBounds = useCallback((bbox, useTransition = false) => {
      const [latMin, lonMax, latMax, lonMin] = bbox;
      const {width, height, ...rest} = viewport;
      const minZoom = 14;
      rest.width = mapRef.current.getMap()._canvas.clientWidth
      rest.height = mapRef.current.getMap()._canvas.clientHeight;

      if (!rest.width || !rest.height) {
        return
      }

      const {longitude, latitude, zoom} = new WebMercatorViewport(rest).fitBounds(
        [
          [lonMin, latMax],
          [lonMax, latMin],
        ],
        {
          padding: 20,
        },
      );

      setViewport({
        longitude,
        latitude,
        zoom: latMin === latMax ? minZoom : zoom,
        ...(useTransition && {
          transitionDuration: 500,
          transitionInterpolator: new FlyToInterpolator(),
        }),
      });
    },
    [setViewport],
  );

  useEffect(() => {
    if (!bbox) {
      return
    }
    zoomToBounds(bbox, true);

  }, [bbox, zoomToBounds]);

  const onMapClick = useCallback((e) => {

    console.log(e)
      setLngLat(e.lngLat[0], e.lngLat[1])

    }, [viewport, setViewport],
  );
  const handleMapOnLoad = useCallback((event) => {
    setMapLanguage(event, 'ru')
  });

  const onMapViewportChange = useCallback(({width, height, ...rest}) => {
    setViewport(rest)
  }, [setViewport]);

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken={mapboxToken}
      width="100%"
      height={height}
      mapStyle="mapbox://styles/kelyanmedia/ckq13vomx07y017nie0wxjol1"
      onLoad={handleMapOnLoad}
      onViewportChange={onMapViewportChange}
      onClick={onMapClick}
      {...viewport}
    >
      {
        latitude && longitude && (
          <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
            <LocationCity/>
          </Marker>
        )
      }

    </ReactMapGL>
  );
};