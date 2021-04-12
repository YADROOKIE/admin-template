import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/share/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/share/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/share/user/logout',
    method: 'post'
  })
}
