import request from '$admin/utils/request'

export function getList(data) {
  return request({
    url: '/realty-categories',
    method: 'get',
  })
}