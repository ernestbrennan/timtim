import {setDefaultProps} from "$js/utils/complex";

export default class Complex {

  id;
  city_id;
  name;
  description;
  longitude;
  latitude;
  street_type;
  street_name;
  house_number;
  min_full_price;
  min_per_square_meter_price;
  currency;
  nearest_release_quarter;
  nearest_release_year;

  characteristics;
  infrastructure;

  constructor(data) {
    Object.assign(this, data);
  }

  initDefaults() {
    this.setCharacteristics([])
    this.setInfrastructure([])

    return this;
  }

  //setters

  setCityId(city_id) {
    this.city_id = city_id;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  setStreetType(street_type) {
    this.street_type = street_type;
  }

  setStreetName(street_name) {
    this.street_name = street_name;
  }

  setHouseNumber(house_number) {
    this.house_number = house_number;
  }

  setMinPerSquareMeterPrice(min_per_square_meter_price) {
    this.min_per_square_meter_price = min_per_square_meter_price;
  }

  setMinFullPrice(min_full_price) {
    this.min_full_price = min_full_price;
  }

  setCurrency(currency) {
    this.currency = currency;
  }

  setNearestReleaseQuarter(nearest_release_quarter) {
    this.nearest_release_quarter = nearest_release_quarter;
  }

  setNearestReleaseYear(nearest_release_year) {
    this.nearest_release_year = nearest_release_year;
  }

  setCharacteristics(characteristics) {
    this.characteristics = characteristics;
  }

  setInfrastructure(infrastructure) {
    this.infrastructure = infrastructure;
  }
};
