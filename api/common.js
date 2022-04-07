import request from '@/utils/request'

// 行情列表
export function marketList() {
  return request({
    url: '/api/product/list',
    method: 'GET'
  })
}

// 手机验证码
export function sendSms(data) {
  return request({
    url: '/api/get-email-code',
    method: 'POST',
    data: data
  })
}

// 广告列表
export function adList() {
  return request({
    url: '/api/banners',
    method: 'GET'
  })
}

// 公告列表
export function noticeList(data) {
  return request({
    url: '/api/trade/broadcast',
    method: 'GET',
	data
  })
}

// 上传图片
export function uploadImg(data) {
  return request({
    url: '/api/upload',
    method: 'POST',
	data: data
  })
}