import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RealtyListItem from '$app/components/realty-list/RealtyListItem';
import ResidentialComplexListing from '$app/components/residentialComplexes/ResidentalComplexListing';
import getApi from '$app/api';
import {selectFilters as convertFiltersToAPIFormat} from '$app/redux/selectors/selectors';
import {SearchType} from '$app/redux/reducers/search';
import {
  getAddRCFavourite,
  getRemoveRCFavourite,
  getSetRCSearchCount,
  searchGeoLoaded,
} from '$app/redux/actions/apiActions';
import {
  onGeoZoomSelected,
  onListFlatHighlighted,
  onMapRealtySelected,
  setSearchType,
} from '$app/redux/actions/uiActions';
import {
  applyRCSpecificChanges,
  convertResidentialComplexData,
} from '$app/utlis/realEstateDevelopers';

import ResidentialComplexListPageView from './ResidentialComplexListPageView'

let oldSearchCount;
let lastCityId = 1;
const apiClient = getApi();
let latestTimeoutId;
let shouldHandleCityChange = true;
let shouldHandleSearchCountChange = true;

export default () => {
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [limit, setLimit] = useState(30);
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState();
  const [selectedListing, setSelectedListing] = useState();
  const [residentialComplexes, setResidentialComplexes] = useState([]);
  const dispatch = useDispatch();
  const {selectedMapFlatGeohash: selectedMapFlatId, RCFavorites: favourites} = useSelector(
    (state) => state.search,
  );
  const filters = useSelector((state) => state.filters);
  const cities = useSelector((state) => state.cities);
  const currentCity = useSelector((state) => state.cities.currentCity);
  const regions = useSelector((state) => state.regions);
  const subways = useSelector((state) => state.subways);
  const RCCount = useSelector((state) => state.search.RCCount);

  const onAddToFavorites = useCallback((id) => dispatch(getAddRCFavourite(id)), [dispatch]);
  const onRemoveFromFavorites = useCallback((id) => dispatch(getRemoveRCFavourite(id)), [dispatch]);
  const onMapPinInfoClose = useCallback(() => {
    dispatch(onMapRealtySelected(null));
    dispatch(onGeoZoomSelected(null));
  }, [dispatch]);

  const setItems = useCallback((items) => {
    setResidentialComplexes(items);
  }, []);

  const onGeoZoomSelected = useCallback((id) => {
      onMapRealtySelected(null);
      dispatch(onGeoZoomSelected(id));
    },
    [dispatch],
  );

  const renewShouldHandleSearchCountChange = useCallback((count) => {
    if (count !== oldSearchCount) {
      setOffset(0);
      setLimit(30);
      shouldHandleSearchCountChange = true;
      oldSearchCount = count;
    }
  }, []);

  const DataProviderWrapper = useCallback(({index, style}) => {
      if (!residentialComplexes[index]) {
        return <RealtyListItem data={{}} style={style} index={index}/>;
      }
      const itemId = residentialComplexes[index]?.id;
      const isFavorite = favourites.has(String(itemId)) || favourites.has(itemId);
      return (
        <ResidentialComplexListing
          residentialComplex={residentialComplexes[index]}
          isFavorite={isFavorite}
          onHover={(hash) => dispatch(onListFlatHighlighted(hash))}
          onGeoZoomSelected={onGeoZoomSelected}
          onAddToFavorites={onAddToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
          style={style}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [residentialComplexes, dispatch, onAddToFavorites, onRemoveFromFavorites, favourites],
  );

  const updateGeojson = useCallback((searchId) => {
      return apiClient.fetchGeoJsonResidentialComplexes(searchId).then((res) => {
        dispatch(
          searchGeoLoaded({
            bbox: res.data.results.bbox,
            geojson: JSON.parse(res.data.results.geojson.trim('"')),
          }),
        );
      });
    },
    [dispatch],
  );

  const updateResidentialComplexes = useCallback((lastSearchId) => {
      const actualLimit = shouldHandleSearchCountChange ? 30 : limit;
      const actualOffset = shouldHandleSearchCountChange ? 0 : offset;
      return apiClient
        .queryRealEstateComplexes({
          searchId: lastSearchId,
          limit: actualLimit,
          offset: actualOffset,
        })
        .then((res) => {
          const realEstateComplexes = res.data.results;
          const newItems =
            shouldHandleCityChange || shouldHandleSearchCountChange
              ? realEstateComplexes.map(convertResidentialComplexData)
              : [
                ...residentialComplexes,
                ...realEstateComplexes.map(convertResidentialComplexData),
              ];
          shouldHandleCityChange = false;
          shouldHandleSearchCountChange = false;
          setItems(newItems);
        })
        .catch((error) => console.error(error));
    },
    [setItems, limit, offset, residentialComplexes],
  );

  const loadMoreItems = useCallback((startIndex, stopIndex) => {
      setOffset(startIndex);
      setLimit(stopIndex - startIndex + 1);
    },
    [setOffset, setLimit],
  );

  const updateRCData = useCallback((isFirstLoad) => {
      const convertedFilters = applyRCSpecificChanges(
        convertFiltersToAPIFormat({filters, cities, subways, regions}),
      );
      apiClient.createSearch(convertedFilters, 'complexes').then((result) => {
        const searchCount = result.data.results.count;
        dispatch(
          getSetRCSearchCount(
            {
              count: searchCount,
              visibleCount: result.data.results.count_to_show || searchCount,
            }, //FIXME: remove when api fixes this bug on their side
          ),
        );
        renewShouldHandleSearchCountChange(searchCount);
        if (isFirstLoad) {
          oldSearchCount = searchCount;
        }
        const promises = [updateResidentialComplexes(result.data.results.id)];
        (isFirstLoad || shouldHandleCityChange || shouldHandleSearchCountChange) &&
        promises.push(updateGeojson(result.data.results.id));
        Promise.all(promises).then(() => {
          isFirstLoad && setFirstLoad(false);
          setLoading(false);
        });
      });
    },
    [
      dispatch,
      updateGeojson,
      updateResidentialComplexes,
      cities,
      filters,
      regions,
      subways,
      renewShouldHandleSearchCountChange,
    ],
  );

  useEffect(() => {
    if (cities.currentCityId !== lastCityId) {
      lastCityId = cities.currentCityId;
      shouldHandleCityChange = true;
      setOffset(0);
      setLimit(30);
    }
  }, [cities.currentCityId, RCCount]);

  useEffect(() => {
    if (selectedMapFlatId) {
      const localSearchResult = residentialComplexes.find((item) => item.id === selectedMapFlatId);
      if (localSearchResult) {
        setSelectedListing(localSearchResult);
      } else {
        apiClient
          .fetchResidentialComplexById(selectedMapFlatId)
          .then((response) =>
            setSelectedListing(convertResidentialComplexData(response.data.results[0])),
          );
      }
    } else {
      setSelectedListing(undefined);
    }
  }, [residentialComplexes, selectedMapFlatId]);

  useEffect(() => {
    //loads map and list data
    if (isLoading || !currentCity.id) {
      return;
    }
    if (isFirstLoad) {
      updateRCData(isFirstLoad);
      setLoading(true);
      return;
    }
    window.clearTimeout(latestTimeoutId);
    latestTimeoutId = window.setTimeout(() => {
      updateRCData();
      setLoading(true);
    }, 300);
    // eslint-disable-next-line
  }, [updateRCData, cities, filters, regions, subways, currentCity]);

  useEffect(() => {
    // clears UI state
    dispatch(onMapRealtySelected(null));
    dispatch(onGeoZoomSelected(null));
    dispatch(setSearchType(SearchType.complex));
  }, [dispatch]);

  return (
    <ResidentialComplexListPageView
      isFirstLoad={isFirstLoad}
      selectedListing={selectedListing}
      DataProviderWrapper={DataProviderWrapper}
      filteredItems={residentialComplexes}
      onMapPinInfoClose={onMapPinInfoClose}
      searchCount={RCCount}
      loadMoreItems={loadMoreItems}
      offset={offset}
      onAddToFavorites={onAddToFavorites}
      onRemoveFromFavorites={onRemoveFromFavorites}
      setOffset={setOffset}
    >
    </ResidentialComplexListPageView>
  );
};
