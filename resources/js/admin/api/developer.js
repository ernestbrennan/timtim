import request from '$admin/utils/request'

export function getList(data) {
  return request({
    url: '/developer',
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: '/developer/by-id',
    method: 'get',
    params: {id},
  })
}

export function create(data) {
  return request({
    url: '/developer/create',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/developer/edit',
    method: 'put',
    data: data
  })
}
