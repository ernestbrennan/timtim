import axios from 'axios';
import FirebaseService from '../services/firebase/FirebaseService';
import filter from 'ramda/src/filter';
import { SupportedLanguageCodes } from '$app/utlis/localization';

class APIClient {
  client = null;
  baseURL = process.env.MIX_APP_API_SERVER;
  currentLanguage = null;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
    });
    this.setLanguage(SupportedLanguageCodes.ru);

    this.client.interceptors.request.use(
      config => {
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    this.client.interceptors.response.use(
      response => {
        if (typeof phpdebugbar != 'undefined') {
          phpdebugbar.ajaxHandler.handle(response.request);
        }

        return response.data
      },

      error => {
        return Promise.reject(Object.assign({}, error).response.data)
      }
    )
  }

  setLanguage(languageCode) {
    this.currentLanguage = languageCode;
    this.client.interceptors.request.use((config) => {
      config.headers['accept-language'] = this.currentLanguage;
      return config;
    });
  }

  getCitiesURL = () => `/api/cities/`;

  getRealtyCategoriesURL = () => `/api/realty-categories/`;

  getFlatsURL = (flatId) => `/api/flats?ids=${flatId}`;

  getFlatUpdateCallsURL = (flatId) => `/api/flats/info/update/${flatId}/calls/`;

  getFlatUpdateViewsURL = (flatId) => `/api/flats/info/update/${flatId}/views/`;

  getFeaturesURL = () => '/api/features/';

  getSearchURL = (searchId) => (searchId ? `/api/search/${searchId}/` : '/api/search/');

  getSearchListURL = (searchId) => `/api/search/${searchId}/list/`;

  getSearchGeohashListURL = (searchId, geohash) => `/api/search/${searchId}/geohash/${geohash}/`;

  getGeoJsonURL = (type) => `/api/geo/${type}`;

  getSignInUrl = () => '/api/profiles/signin/';

  getFavoritesURL = () => '/api/favorites/';

  getFavoriteURL = (id) => `/api/favorites/${id}/`;


  fetchCities() {
    return this.client.get(this.getCitiesURL());
  }

  fetchRealtyCategories() {
    return this.client.get(this.getRealtyCategoriesURL());
  }

  fetchFlatById(flatId) {
    return this.client.get(this.getFlatsURL(flatId));
  }

  updateFlatCalls(flatId) {
    return this.client.get(this.getFlatUpdateCallsURL(flatId));
  }

  updateFlatViews(flatId) {
    return this.client.get(this.getFlatUpdateViewsURL(flatId));
  }

  fetchFeatures() {
    return this.client.get(this.getFeaturesURL());
  }

  createSearch(filters, type) {
    if (type === 'complexes') {
      return this.client.post(`api/search/complexes/`, filters);
    }
    if (type === 'layouts') {
      return this.client.post(`api/search/layouts/`, filters);
    }
    return this.client.post(this.getSearchURL(), filters);
  }

  updateSearch(searchId, filters, type) {
    if (type === 'complexes') {
      return this.client.put(`api/search/complexes/${searchId}`, filters);
    }
    return this.client.put(this.getSearchURL(searchId), filters);
  }

  fetchSearchList(searchId, start, end, order) {
    return this.client.get(this.getSearchListURL(searchId), {
      params: {
        offset: start,
        limit: end - start + 1,
        ordering: order,
      },
    });
  }

  fetchSearchGeohashList(searchId, geohash, start, end) {
    return this.client.get(this.getSearchGeohashListURL(searchId, geohash), {
      params: {
        offset: start,
        limit: end - start + 1,
      },
    });
  }

  fetchGeoJson(type, filters) {
    return this.client({
      url: this.getGeoJsonURL(type),
      method: 'post',
      data: filters
    })
  }

  fetchFavorites(token) {
    return this.client.get(this.getFavoritesURL(), {
      headers: { Authorization: token },
    });
  }

  addToFavorites(flatId, token) {
    return this.client.post(
      this.getFavoritesURL(),
      { flat: flatId },
      {
        headers: { Authorization: token },
      },
    );
  }

  removeFromFavorites(favoriteId, token) {
    return this.client.delete(this.getFavoriteURL(favoriteId), {
      headers: { Authorization: token },
    });
  }

  signIn(token) {
    return this.client.get(this.getSignInUrl(), {
      headers: { Authorization: token },
    });
  }

  fetchRealEstateComplexes(limit, offset, orderByDate = false) {
    return this.client.get(
      `api/complexes?limit=${limit}&offset=${offset}${orderByDate ? '&ordering=date' : undefined}`,
    );
  }

  fetchGeoJsonResidentialComplexes(searchId) {
    return this.client.get(`api/search/complexes/${searchId}/geojson_v2`);
  }

  queryRealEstateComplexes({ searchId, limit, offset }) {
    return this.client.get(
      `api/search/complexes/${searchId}/list/?limit=${limit}&offset=${offset}`,
      {},
    );
  }

  fetchResidentialComplexById(id) {
    return this.client.get(`api/complexes/?ids=${id}`);
  }

  queryLayouts(filters, limits) {
    try {
      return new Promise((resolve, reject) => {
        this.createSearch(filters, 'layouts').then((response) => {
          const itemCountForSearch = response.data.count;
          this.client
            .get(
              `api/search/layouts/${response.data.results.id}/list?limit=${limits.limit}&offset=${limits.offset}`,
            )
            .then((response) => {
              response.data.count = itemCountForSearch;
              resolve(response.data);
            });
        });
      });
    } catch (error) {
      console.error(error);
      return new Promise((resolve) => resolve({ results: [], count: 0 }));
    }
  }

  async fetchRCFavoritesIDs() {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.get(`api/favorites/complexes/`, {
      headers: { Authorization: token },
    });
  }

  async addRCToFavorites(complexId) {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.post(
      `api/favorites/complexes/`,
      { complex: complexId },
      {
        headers: { Authorization: token },
      },
    );
  }

  async removeRCFromFavorites(favoriteId) {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.delete(`api/favorites/complexes/${favoriteId}/`, {
      headers: { Authorization: token },
    });
  }

  async createDeveloperRequest(complexId, request) {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );

    const processedRequest = filter((value) => {
      return Boolean(value);
    }, request);
    return this.client.post(
      `api/complexes/${complexId}/requests/`,
      {
        ...processedRequest,
      },
      { headers: { Authorization: token } },
    );
  }

  async fetchLayoutFavoritesIds() {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.get(`api/favorites/layouts/`, {
      headers: { Authorization: token },
    });
  }

  async fetchLayoutsFavorites(IDs) {
    const idsString = [...IDs].join(',');
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.get(`api/layouts/?ids=${idsString}`, {
      headers: { Authorization: token },
    });
  }

  async addLayoutToFavorites(layoutId) {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.post(
      `api/favorites/layouts/`,
      { layout: layoutId },
      {
        headers: { Authorization: token },
      },
    );
  }

  async removeLayoutFromFavorites(favoriteId) {
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.delete(`api/favorites/layouts/${favoriteId}/`, {
      headers: { Authorization: token },
    });
  }

  async geyLayoutsCountForFilters(filters) {
    return new Promise((resolve, reject) => {
      this.createSearch(filters, 'layouts').then((response) =>
        resolve(response.data.results.count),
      );
    });
  }

  async fetchRCFavorites(IDs) {
    const idsString = [...IDs].join(',');
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.get(`api/complexes/?ids=${idsString}`, {
      headers: { Authorization: token },
    });
  }

  async fetchAdvFavorites(IDs) {
    const idsString = [...IDs].join(',');
    const token = await FirebaseService.getInstance().getIdToken.call(
      FirebaseService.getInstance(),
    );
    return this.client.get(`api/flats/?ids=${idsString}`, {
      headers: { Authorization: token },
    });
  }
}

let apiInstance;
function getApi() {
  if (!apiInstance) {
    apiInstance = new APIClient();
  }
  return apiInstance;
}
export default getApi;
