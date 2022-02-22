import {currencies} from "$js/config";

export default class Realty {

  id;
  city_id;
  type;
  longitude;
  latitude;
  street_type;
  street_name;
  house_number;
  description;
  advType;
  price;
  currency;
  size_total;
  size_kitchen;
  size_living;
  floor;
  floor_count;
  room_count;
  layout_type;
  heating_type;
  bathroom_type;
  condition_type;
  wall_type;
  building_type;
  furniture_type;
  communal_payments_type;
  entrance_types;
  parking_types;
  is_owner;
  allow_animals
  allow_foreigners
  allow_kids
  allow_roommates
  allow_smoking

  feature_ids;

  constructor(data) {
    Object.assign(this, data);
  }

  initDefaults(options) {
    this.setType(options.types[0].value);
    this.setAdvType(options.adv_types[0].value);
    this.setCurrency(currencies.usd.value);
    this.setCommunalPaymentsType(options.communal_payments_types[0].value);
    this.setRoomCount(options.room_counts[0].value);
    this.setLayoutType(options.layout_types[0].value);
    this.setBathroomType(options.bathroom_types[0].value);
    this.setConditionType(options.condition_types[0].value);
    this.setFurnitureType(options.furniture_types[0].value);
    this.setHeatingType(options.heating_types[0].value);
    this.setWallType(options.wall_types[0].value);
    this.setBuildingType(options.building_types[0].value);
    this.setParkingTypes([]);
    this.setEntranceTypes([]);
    this.setAllowAnimals(true)
    this.setAllowKids(true)
    this.setAllowRoommates(true)
    this.setAllowSmoking(true)
    this.setAllowForeigners(true)
    this.setFeatureIds([]);

    return this;
  }

  //setters
  setType(type) {
    this.type = type;
  }

  setCityId(city_id) {
    this.city_id = city_id;
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

  setDescription(description) {
    this.description = description;
  }

  setAdvType(adv_type) {
    this.adv_type = adv_type;
  }

  setPrice(price) {
    this.price = price;
  }

  setCurrency(currency) {
    this.currency = currency;
  }

  setSizeTotal(size_total) {
    this.size_total = size_total;
  }

  setSizeKitchen(size_kitchen) {
    this.size_kitchen = size_kitchen;
  }

  setSizeLiving(size_living) {
    this.size_living = size_living;
  }

  setFloor(floor) {
    this.floor = floor
  }

  setFloorCount(floor_count) {
    this.floor_count = floor_count
  }

  setRoomCount(room_count) {
    this.room_count = room_count;
  }

  setLayoutType(layout_type) {
    this.layout_type = layout_type;
  }

  setHeatingType(heating_type) {
    this.heating_type = heating_type
  }

  setBathroomType(bathroom_type) {
    this.bathroom_type = bathroom_type;
  }

  setConditionType(condition_type) {
    this.condition_type = condition_type;
  }

  setWallType(wall_type) {
    this.wall_type = wall_type
  }

  setBuildingType(building_type) {
    this.building_type = building_type
  }

  setFurnitureType(furniture_type) {
    this.furniture_type = furniture_type;
  }

  setCommunalPaymentsType(communal_payments_type) {
    this.communal_payments_type = communal_payments_type;
  }

  setParkingTypes(parking_types) {
    this.parking_types = parking_types
  }

  setEntranceTypes(entrance_types) {
    this.entrance_types = entrance_types
  }

  setIsOwner(is_owner) {
    this.is_owner = is_owner
  }

  setAllowAnimals(allow_animals) {
    this.allow_animals = allow_animals
  }

  setAllowForeigners(allow_foreigners) {
    this.allow_foreigners = allow_foreigners
  }

  setAllowKids(allow_kids) {
    this.allow_kids = allow_kids
  }

  setAllowRoommates(allow_roommates) {
    this.allow_roommates = allow_roommates
  }

  setAllowSmoking(allow_smoking) {
    this.allow_smoking = allow_smoking
  }

  setFeatureIds(feature_ids) {
    this.feature_ids = feature_ids
  }
};
