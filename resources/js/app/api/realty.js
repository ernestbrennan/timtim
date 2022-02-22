import ApiClientService from "$app/services/ApiClientService";

export function getList(params) {
  return ApiClientService.getInstance().client({
    url: '/api/realty',
    method: 'post',
    data: params
  });
}

export function getOptions() {
  return ApiClientService.getInstance().client({
    url: '/api/realty/options',
    method: 'get',
  });
}
export function getById(id) {
  return ApiClientService.getInstance().client({
    url: '/api/realty/by-id',
    method: 'get',
    params: {id}
  });
}
