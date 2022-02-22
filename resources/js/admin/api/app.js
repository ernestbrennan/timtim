import request from "$admin/utils/request";

export function options() {
  return request({
    url: '/options',
    method: 'get',
  })
}