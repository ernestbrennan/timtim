import request from '$admin/utils/request'

export function getList(data) {
  return request({
    url: '/realty',
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: '/realty/by-id',
    method: 'get',
    params: {id},
  })
}

export function create(data) {
  return request({
    url: '/realty/create',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/realty/edit',
    method: 'put',
    data: data
  })
}
