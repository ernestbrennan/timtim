import request from '$admin/utils/request'

export function getList(data) {

  return request({
    url: '/city',
    method: 'get',
  })
}


