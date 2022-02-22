import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
import WebMercatorViewport from "viewport-mercator-project";

import {defaultViewport} from "$app/components/map/style";
import {setMapLanguage} from "$js/map/helpers";
import {mapboxToken} from '$js/config';


export default ({height, bbox}) => {
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState(defaultViewport);

  const zoomToBounds = useCallback((bbox, useTransition = false) => {
      const [latMin, lonMax, latMax, lonMin] = bbox;
      const {width, height, ...rest} = viewport;
      const minZoom = 14;
      rest.width = mapRef.current.getMap()._canvas.clientWidth
      rest.height = mapRef.current.getMap()._canvas.clientHeight;

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
    if (bbox) zoomToBounds(bbox, true);

  }, [bbox]);

  const handleMapOnLoad = useCallback((event) => {

    setMapLanguage(event, 'ru')
  });

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken={mapboxToken}
      width="100%"
      height={height}
      mapStyle="mapbox://styles/kelyanmedia/ckq13vomx07y017nie0wxjol1"
      onLoad={handleMapOnLoad}
      // mapStyle="mapbox://styles/wrenchtech/cjnbijdyp5z8f2rleqgbm4bf5"
      // onViewportChange={onMapViewportChange}
      {...viewport}
    >
    </ReactMapGL>
  );
};
