import axios from 'axios';
import { SupportedLanguageCodes } from '$app/utlis/localization';
import AuthService from "$app/services/AuthService";

export default class ApiClientService {
  static _instance;

  client = null;
  baseURL = process.env.MIX_APP_API_SERVER;
  currentLanguage = null;

  static getInstance() {
    if (!this._instance) {
      this._instance = new ApiClientService();
    }
    return this._instance;
  }

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
    });
    this.setLanguage(SupportedLanguageCodes.ru);

    this.client.interceptors.request.use(
      config => {

        const token = AuthService.getInstance().getToken()

        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token
        }

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
}
