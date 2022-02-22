import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import produce, {setAutoFreeze} from 'immer';
import ReactMapGL, {FlyToInterpolator, TRANSITION_EVENTS} from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import 'mapbox-gl/dist/mapbox-gl.css';

import RealtyMarker from './RealtyMarker.js';
import ComplexMarker from './ComplexMarker';
import NavButton from './NavButton';
import {mapStyle, defaultViewport, interactiveLayerIds, MapType} from './style.js';

import useAdvType from '$app/hooks/useAdvType.js';
import {currencies, mapboxToken} from '$js/config';
import {advTypes} from '$js/utils/realty';
import {onGeoZoomSelected, onMapRealtySelected} from '$app/redux/actions/uiActions';
import {useTheme} from "@material-ui/core/styles";

const navButton = <NavButton key={'NavButton'}/>;

setAutoFreeze(false);

const citiesSelector = (state) => state.cities.cities;
const currentCityIdSelector = (state) => state.cities.currentCityId;
const geojsonBboxSelector = (state) => state.search.bbox;
const geojsonSelector = (state) => state.search.geojson;
const highlightedFlatIdSelector = (state) => state.search.highlightedFlatId;
const zoomToGeohashSelector = (state) => state.search.selectedListFlatGeohash;
const selectedMapGeohashSelector = (state) => state.search.selectedMapFlatGeohash;
const languageSelector = (state) => state.ui.language;

const cityBboxSelector = createSelector(citiesSelector, currentCityIdSelector, (cities, cityId) => {
  return cityId && cities.length ? cities.find((c) => c.id === cityId).bbox : null;
});

let timeout = null;

const MapViewFC = ({type}) => {

  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const cityBbox = useSelector(cityBboxSelector);
  const geojsonBbox = useSelector(geojsonBboxSelector);
  const geojson = useSelector(geojsonSelector);
  const highlightedFlatId = useSelector(highlightedFlatIdSelector);
  const geohashToZoom = useSelector(zoomToGeohashSelector);
  const selectedMapGeohash = useSelector(selectedMapGeohashSelector);
  const language = useSelector(languageSelector);
  const advType = useAdvType();
  const theme = useTheme();

  const mapLanguage = language === 'uk' ? '' : `_${language}`;
  const defaultMapStyle = mapStyle(mapLanguage, theme);
  const [mapboxStyle, setMapboxStyle] = useState(defaultMapStyle);
  const [viewport, setViewport] = useState(defaultViewport);
  const [points, setPoints] = useState([]);

  const flatClickHandler = useCallback(
    (geohash) => {
      dispatch(onMapRealtySelected(geohash));
      dispatch(onGeoZoomSelected(null));
    },
    [dispatch],
  );

  const markersDisplayHanlder = useCallback(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (!mapRef.current) {
        return;
      }

      const map = mapRef.current.getMap();
      const zoom = map.getZoom();

      if (zoom <= 15) {
        setPoints([]);
        return;
      }

      const features = map.querySourceFeatures('points').filter((f) => !f.properties.cluster);
      const filteredFeatures = [];
      const addedFeatures = new Set();

      features.forEach((f) => {
        if (!addedFeatures.has(f.properties.id)) {
          addedFeatures.add(f.properties.id);
          filteredFeatures.push(f);
        }
      });
      setPoints(filteredFeatures);
    }, 100);
  }, [setPoints]);

  const onMapViewportChange = useCallback(({width, height, ...rest}) => {
      setViewport(rest);
      markersDisplayHanlder();
    },
    [setViewport, markersDisplayHanlder],
  );

  const onMapClick = useCallback((e) => {
      // console.log(mapRef.current.getMap().getBounds());

      const feature = e.features.find((f) => f.layer.id === 'clusters' || f.layer.id === 'points');
      if (!feature) {
        return;
      }

      setViewport({
        ...viewport,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        zoom: Math.min(viewport.zoom + 2, 16),
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
      });
    },
    [viewport, setViewport],
  );

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

      // console.log({latMin, lonMax, latMax, lonMin})
      // console.log(longitude, latitude)
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
    if (!cityBbox) {
      return;
    }
    zoomToBounds(cityBbox);
  }, [cityBbox, zoomToBounds]);


  // zoom in if bound box is present
  useEffect(() => {
    const mapGL = mapRef.current.getMap();
    if (!mapGL) {
      return;
    }

    const bounds = mapGL.getBounds();

    if (!geojsonBbox) {
      return zoomToBounds([bounds._ne.lat, bounds._sw.lng, bounds._sw.lat, bounds._ne.lng], true);
    }

    zoomToBounds(geojsonBbox, true);
  }, [geojsonBbox, zoomToBounds, mapRef, geojson]);


  // if some point is selected, zoom to it
  useEffect(() => {
    if (!geohashToZoom) {
      return;
    }

    const feature = geojson.features.find((f) => f.properties.id === geohashToZoom);

    if (feature) {
      setViewport({
        ...viewport,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        zoom: 16,
        transitionDuration: 800,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geohashToZoom, setViewport, geojson]);

  // draw highlighted objects, including clusters
  useEffect(() => {
    if (!geojson) {
      return;
    }

    setMapboxStyle(
      produce((draft) => {
        draft.sources.clusterSelected.clusterProperties.isSelected = [
          'any',
          ['==', ['get', 'id'], highlightedFlatId],
        ];

        if (geojson && draft.sources.pointsSelected.data) {
          const selection = selectedMapGeohash || highlightedFlatId;

          draft.sources.pointsSelected.data.features[0] = geojson.features.find(
            (f) => f.properties.id === selection,
          ) ?? [];
        }
      }),
    );
  }, [highlightedFlatId, selectedMapGeohash, geojson]);

  // draw points and clusters
  useEffect(() => {
    if (!geojson) {
      return;
    }

    mapRef.current.getMap().getCanvas().style.cursor = 'pointer';

    // geojson.features.forEach((f) => {
    //   f.id = parseInt(f.properties.hash, 36);
    // });

    setMapboxStyle(
      produce((draft) => {
        draft.sources.points.data = geojson;
        draft.sources.clusterSelected.data = geojson;
        draft.sources.pointsSelected.data = {
          type: 'FeatureCollection',
          features: [],
        };
      }),
    );
  }, [geojson]);

  const markers = useMemo(() => {
    // create markers from geojson points

    if (!points.length) {
      return [navButton];
    }

    const markers = type === MapType.complexList
      ? points.map((feature) => {
        return (
          <ComplexMarker
            key={feature.properties.id}
            feature={feature}
            onSelected={flatClickHandler}
            isHighlighted={
              feature.properties.id === highlightedFlatId ||
              feature.properties.id === selectedMapGeohash ||
              feature.properties.id === geohashToZoom
            }
          />
        );
      })
      : points.map((advFeature) => {
        return (
          <RealtyMarker
            key={advFeature.properties.id}
            feature={advFeature}
            onMapRealtySelected={flatClickHandler}
            highlightedFlatId={highlightedFlatId}
            selectedMapGeohash={selectedMapGeohash}
          />
        );
      });

    markers.push(navButton);
    return markers;
  }, [
    points,
    highlightedFlatId,
    selectedMapGeohash,
    flatClickHandler,
    type,
    geohashToZoom,
  ]);


  return (
    <ReactMapGL
      width="100%"
      height="100%"
      {...viewport}
      ref={mapRef}
      mapStyle={mapboxStyle}
      onViewportChange={onMapViewportChange}
      onClick={onMapClick}
      mapboxApiAccessToken={mapboxToken}
      interactiveLayerIds={interactiveLayerIds}
      transitionInterruption={TRANSITION_EVENTS.IGNORE}
      children={markers}
    />
  );
};

ReactMapGL.whyDidYouRender = false;
export default memo(MapViewFC);
