import { flatten, pickBy } from 'ramda';
import take from 'ramda/src/take';
import takeLast from 'ramda/src/takeLast';
import { t } from '@lingui/macro';

import ResidentialComplexListingDescriptor from '$app/dto/ResidentialComplexListingDescriptor';
import RealEstateDeveloperDescriptor from '$app/dto/RealEstateDeveloperDescriptor';
import { FILTERS } from '$app/redux/const/filters';

export function getMinimalPriceFromLinesRanges(linesRanges) {
  if (linesRanges?.length > 0) {
    const plans = linesRanges.map(line => line.plans)
    const layouts = flatten(plans?.map(plans => Object.values(plans)))
    let smallestPricePerSquareMeter = Math.ceil(layouts[0].min_price_uah / layouts[0].min_size_total);
    layouts.forEach(
      (layout) => {
        const pricePerSquareMeter = Math.ceil(layout.min_price_uah / layout.min_size_total);
        if (pricePerSquareMeter < smallestPricePerSquareMeter) {
          smallestPricePerSquareMeter = pricePerSquareMeter
        }
      }
    )
    return smallestPricePerSquareMeter;
  }
}

/**
 *
 * @param item
 * @returns {ResidentialComplexListingDescriptor}
 */
export function convertResidentialComplexData(item) {
  const earliestCompletionDate = String(Math.min(...item.lines_ranges));
  return new ResidentialComplexListingDescriptor({
    id: item.id,
    name: item.name,
    cityId: item.city,
    cityName: item.locality_name,
    realEstateDeveloper: new RealEstateDeveloperDescriptor({
      id: item.developers[0].id,
      url: item.developers[0].url,
      name: item.developers[0].name,
      logoSrc: item.developers[0].icon,
      finishedBuildings: item.developers[0].houses_done,
      finishedComplexes: item.developers[0].complexes_done,
      inProgressBuildings: item.developers[0].houses_in_progress,
      inProgressComplexes: item.developers[0].complexes_in_progress,
    }),
    images: item.images,
    type: item.house_attributes.items.find((item) => item.type === 'grade')?.value.join(', '),
    address: item.address,
    subwaysDistance: item.subways_distance,
    status: item.status,
    minimalPriceUah: item.min_square_meter_prices?.uah
      ? item.min_square_meter_prices?.uah
      : getMinimalPriceFromLinesRanges(item.lines),
    minimalFullPriceUah: item.uah_max,
    url: item.url,
    description: item.description,
    lines: item.lines,
    plans: item.plans,
    complexAdvantages: item.complex_advanteges.items,
    houseAttributes: item.house_attributes.items,
    infrastructure: item.infrastructure.items,
    coordinates: {
      longitude: item.location_point.lon,
      latitude: item.location_point.lat,
    },
    completionYear: item.nearest_complex_release?.year || take(4)(earliestCompletionDate),
    completionQuarter: item.nearest_complex_release?.quarter || takeLast(1)(earliestCompletionDate),
    isVerified: item.is_verified,
    promotions: item.promotions.items,
    constructionProgress: item.build_steps.items,
    documents: item.docs,
    callbackPhone: item.callback_phone,
    district: item.district,
  });
}

export function getGeoFeatureFromRealEstateComplex(complex) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: complex.location_point
        ? [complex.location_point.lon, complex.location_point.lat]
        : [complex.coordinates.longitude, complex.coordinates.latitude],
    },
    properties: {
      count: 1,
      complex_id: complex.id,
      hash: complex?.additional_info?.properties.hash || complex.id,
      title: complex.name,
      price_uah: complex.minimalFullPriceUah || getMinimalPriceFromLinesRanges(complex.lines) || complex.price_uah,
      price_usd: complex.price_usd,
      currency: complex.currency,
    },
    id: complex.id,
  };
}

export function convertRealEstateToGeoJson(realEstateComplexesArray) {
  return {
    geojson: {
      type: 'FeatureCollection',
      features: realEstateComplexesArray.map(getGeoFeatureFromRealEstateComplex),
    },
  };
}

export function getNearestSubwayStation(subwaysDistance, subwayStations) {
  const nearestSubway =
    subwaysDistance.length &&
    subwaysDistance.reduce((prev, cur) => (!prev || prev.minutes > cur.minutes ? cur : prev));

  if (nearestSubway) {
    const stationRecord = subwayStations[nearestSubway.subway_id];
    nearestSubway.name = stationRecord?.name;
    nearestSubway.slug_seo = stationRecord?.slug_seo;
    nearestSubway.lineColor = stationRecord && '#' + stationRecord.lineColor;
  }
  return nearestSubway;
}

export function getStatusStringFromLayout(layout) {
  return `${layout.quarter} квартал ${layout.year}`;
}

export function adaptFiltersToLayouts(filters, complexId) {
  const draft = filters;
  const completionDateFilter = draft.filters.flatParams.find(
    (item) => item.filterName === 'lines_ranges',
  );
  const roomsNumFilter = draft.filters.flatParams.find((item) => item.filterName === 'room_params');
  draft.filters.flatParams = draft.filters.flatParams.filter(
    (filter) =>
      filter.filterName !== 'adv_type' &&
      filter.filterName !== 'lines_ranges' &&
      filter.filterName !== 'room_params',
  );
  draft.filters.flatParams.push({
    filterName: 'complex_id',
    params: {
      complex_id: Number(complexId),
    },
  });
  if (completionDateFilter) {
    const { year_min, quarter_min, year_max, quarter_max } = completionDateFilter.params;
    draft.filters.flatParams.push({
      filterName: 'year',
      params: {
        min: year_min,
        max: year_max,
      },
    });
    draft.filters.flatParams.push({
      filterName: 'quarter',
      params: {
        min: quarter_min,
        max: quarter_max,
      },
    });
  }
  if (roomsNumFilter) {
    draft.filters.flatParams.push({
      filterName: 'rooms_num',
      params: {
        min: roomsNumFilter.params.gte_than,
        max: roomsNumFilter.params.lte_than,
        values: roomsNumFilter.params.values,
      },
    });
  }
  return draft;
}

export function applyRCSpecificChanges(filtersStruct) {
  filtersStruct.filters.flatParams = filtersStruct.filters.flatParams.filter(
    (filter) => filter.filterName !== FILTERS.ADV_TYPE,
  );
  filtersStruct.filters.geoParams.length === 0 &&
    filtersStruct.filters.geoParams.push({
      filterName: 'city',
      params: { city: 1 },
    });
  const roomNumFilterIndex = filtersStruct.filters.flatParams.findIndex(
    (filter) => filter.filterName === FILTERS.ROOM_PARAMS,
  );
  if (roomNumFilterIndex !== -1) {
    const oldRoomNumFilter = filtersStruct.filters.flatParams[roomNumFilterIndex];
    const newRoomNumFilter = {
      filterName: FILTERS.ROOM_PARAMS,
      params: pickBy((value) => value !== null, oldRoomNumFilter.params),
    };
    filtersStruct.filters.flatParams.splice(roomNumFilterIndex, 1, newRoomNumFilter);
  }
  const isOwnerFilterIndex = filtersStruct.filters.flatParams.findIndex(
    (filter) => filter.filterName === FILTERS.LISTING_PARAMS,
  );
  if (isOwnerFilterIndex !== -1) {
    filtersStruct.filters.flatParams.splice(isOwnerFilterIndex, 1);
  }
  return filtersStruct;
}

export function displayRequestSentAlert() {
  window.alert(t`Your request has been sent! The consultant will contact you soon`);
}
