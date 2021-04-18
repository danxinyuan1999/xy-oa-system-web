import request from '@/utils/request'

export function fetchDepartList() {
  return request({
    url: '/depart/listAll',
    method: 'get'
  })
}
