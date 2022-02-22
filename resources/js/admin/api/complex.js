import request from '$admin/utils/request'

export function getList(data) {
  return request({
    url: '/complex',
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: '/complex/by-id',
    method: 'get',
    params: {id},
  })
}

export function create(data) {
  return request({
    url: '/complex/create',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/complex/edit',
    method: 'put',
    data: data
  })
}
