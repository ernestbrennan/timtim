import ApiClientService from '$app/services/ApiClientService';

export function getList() {
  return ApiClientService.getInstance().client({
    url: '/api/city',
    method: 'get',
  });
}