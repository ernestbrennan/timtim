import axios from 'axios'

const service = axios.create({
  baseURL: '/admin/api',
  timeout: 15000,
});

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (typeof phpdebugbar != 'undefined') {
      phpdebugbar.ajaxHandler.handle(response.request);
    }

    return response.data
  },

   error => {
    return Promise.reject(Object.assign({}, error).response)
  }
)

export default service
