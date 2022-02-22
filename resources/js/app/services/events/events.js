import FirebaseService from '../firebase/FirebaseService';

const enableAnalytics = true;
const logToConsole = false;

/**
 * @typedef {Object} AnalyticsEvent
 * @property {string} name
 * @property {Object} [params]
 */

/**
 *
 * @param {{name: string}} event
 */

export function sendAnalyticsEvent(event) {
  if (enableAnalytics) {
    FirebaseService.getInstance().analytics().logEvent(event.name, event.params);
  }
  if (logToConsole) {
    console.log(event.name, event.params);
  }
}

export function getAnalyticsComplexPlanForm(layout) {}
export function getAnalyticsComplexForm(RC) {
  return RC;
}
export function getAnalyticsEstateForm(flat) {
  return {
    city_id: flat.city_id,
    adv_type: flat.adv_type,
    room_num: flat.room_num,
    price_uah: flat.price_uah,
    price_usd: flat.price_usd,
    size_total: flat.size_total,
    address: flat.address,
    district: flat.district,
    lat: flat.lat,
    lon: flat.lon,
    object_id: flat.id,
    nearest_subway_id: flat.nearest_subway_id,
  };
}
export function getAnalyticsSearchForm(search) {}
