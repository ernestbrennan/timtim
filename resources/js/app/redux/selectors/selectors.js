import { FILTERS } from '../const/filters';

const getCityFilter = (filters) => {
  if (!filters) {
    return null;
  }
  const { currentCityId } = filters;
  return currentCityId
    ? {
        filterName: FILTERS.CITY,
        params: {
          city: currentCityId,
        },
      }
    : null;
};

const getRoomFilterParams = (rooms) => {
  const maxRoomValue = 4;
  const minRoomValue = 1;
  let sorted = [...rooms].sort();
  const gte_than =
    sorted[sorted.length - 1] === maxRoomValue
      ? sorted.reduceRight((acc, current) => (current === acc - 1 ? current : acc), maxRoomValue)
      : null;

  let lte_than =
    sorted[0] === minRoomValue
      ? sorted.reduce((acc, current) => (current === acc + 1 ? current : acc), minRoomValue)
      : null;
  if (lte_than === 1) {
    lte_than = null;
  }
  const values = sorted.filter(
    (v) => (gte_than === null || v < gte_than) && (lte_than === null || v > lte_than),
  );
  return { gte_than, lte_than, values };
};

const getRoomFilter = ({ rooms }) =>
  rooms?.length && rooms.length < 4
    ? {
        filterName: FILTERS.ROOM_PARAMS,
        params: getRoomFilterParams(rooms),
      }
    : null;

const getListingFilter = ({ isOwner }) =>
  isOwner
    ? {
        filterName: FILTERS.LISTING_PARAMS,
        params: {
          is_owner: isOwner,
        },
      }
    : null;

const getPriceFilter = ({ priceMin, priceMax, currency }) =>
  priceMin || priceMax
    ? {
        filterName: FILTERS.PRICE,
        params: {
          ...(priceMin && { min: priceMin }),
          ...(priceMax && { max: priceMax }),
          currency,
        },
      }
    : null;

const getAdvTypeFilter = ({ advType }) => {
  return {
    filterName: FILTERS.ADV_TYPE,
    params: {
      adv_type: advType,
    },
  };
};

const getSizeFilter = ({ sizeMin, sizeMax }) =>
  sizeMin || sizeMax
    ? {
        filterName: FILTERS.SIZE_TOTAL,
        params: {
          ...(sizeMin && { min: sizeMin }),
          ...(sizeMax && { max: sizeMax }),
        },
      }
    : null;
const getBuildingParamsFilter = ({ isNotFirstFloor, isNotLastFloor }) =>
  isNotFirstFloor || isNotLastFloor
    ? {
        filterName: FILTERS.BUIDLING_PARAMS,
        params: {
          ...(isNotFirstFloor && { is_not_first: isNotFirstFloor }),
          ...(isNotLastFloor && { is_not_top: isNotLastFloor }),
        },
      }
    : null;

const getLinesRangesFilter = ({ dueDate }) => ({
  filterName: FILTERS.LINES_RANGES,
  params: dueDate,
});

const getGeofilters = (cities) =>
  [ getCityFilter(cities)].filter(
    (v) => v !== null,
  );

const getFlatFilters = (filters) =>
  [
    getRoomFilter(filters),
    getBuildingParamsFilter(filters),
    getListingFilter(filters),
    getPriceFilter(filters),
    getSizeFilter(filters),
    getAdvTypeFilter(filters),
    getLinesRangesFilter(filters),
  ].filter((v) => v !== null);

export const selectAdvType = ({filters}) => {
  return filters.advType
}
export const selectFilters = ({ cities, filters }) => {
  return {
    filters: {
      geoParams: getGeofilters(cities),
      flatParams: getFlatFilters(filters),
    },
  };
};

export const selectSearchFilters = ({ cities, filters }) => {
  const { currentCityId } = cities;

  return {
    city_id: currentCityId,
    adv_type: filters.advType,
    currency: filters.currency,
    price_max: filters.priceMax,
    price_min: filters.priceMin,
    size_max: filters.sizeMax,
    size_min: filters.sizeMin,
    room_counts: filters.rooms,
    types: Array.from( filters.realtyTypesSelected),
    is_owner: filters.isOwner,
  }
};

export function selectCityById(id, cities) {
  return cities.find((city) => city.id === id);
}
