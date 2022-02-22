export const FavouriteTypes = {
  rentAndSale: 'RENT_AND_SALE',
  complexes: 'COMPLEXES',
  layouts: 'LAYOUTS',
};

export const TokenTypes = {
  advType: 'advType',
  roomsNumber: 'roomsNumber',
  cityName: 'cityName',
  subwayName: 'subwayName',
  districtName: 'districtName',
};

const currentYear = 2000;
const currentQuarter = 1; //TODO: what starting year should we use?

export const DEFAULT_DUE_DATE_FILTERS = {
  year_max: currentYear + 1000,
  year_min: currentYear,
  quarter_max: 4,
  quarter_min: currentQuarter,
};
