import ApiClientService from "$app/services/ApiClientService";

export function getList(params) {
  return ApiClientService.getInstance().client({
    url: '/api/complex',
    method: 'post',
    data: params
  });
}

export function getById(id) {
  return ApiClientService.getInstance().client({
    url: '/api/complex/by-id',
    method: 'get',
    params: {id}
  });
}

export function getTest() {
  return ApiClientService.getInstance().client({
    url: '/api/complex/test',
    method: 'get',
  });
}

