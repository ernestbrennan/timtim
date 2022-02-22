export default class FlatModel {
  id;
  title;
  adv_type;
  is_suburban;
  description;
  url;
  base_price;
  city;
  location_point;
  currency;
  price_uah;
  price_usd;
  price_eur;
  price_rub;
  price_pln;
  district;
  street;
  building_no;
  is_owner;
  is_verified;
  owner_name;
  owner_phone;
  created_at;
  updated_at;
  size_total;
  size_kitchen;
  size_living;
  room;
  floor;
  floors_total;
  is_last_floor;
  is_first_floor;
  subways_distance;
  additional_info;
  providers;
  landlords;
  features;
  properties;
  locality_name;
  location;
  address_raw;
  group_id;
  images;
  promos;
  is_top;

  constructor(data) {
    Object.assign(this, data);
    this.size_total = Math.round(data.size_total);
    this.size_kitchen = Math.round(data.size_kitchen);
    this.size_living = Math.round(data.size_living);
  }
}
