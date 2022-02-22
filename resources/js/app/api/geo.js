import ApiClientService from "$app/services/ApiClientService";

export function getRealty(params) {
  return ApiClientService.getInstance().client({
    url: '/api/geo/realty',
    method: 'post',
    data: params
  });
}
export function getComplex(params) {
  return ApiClientService.getInstance().client({
    url: '/api/geo/complex',
    method: 'post',
    data: params
  });
}