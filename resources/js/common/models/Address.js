export default class Address {
  id;
  latitude;
  longitude;

  // constructor({latitude = null, longitude = null}) {
  //   this.latitude = latitude
  //   this.longitude = longitude
  // }

  setLatitude(latitude){
    this.latitude = latitude;
  }
  setLongitude(longitude){
    this.longitude = longitude;
  }
}
