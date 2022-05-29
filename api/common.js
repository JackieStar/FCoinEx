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
// 点击签到
export function clickSign() {
  return request({
    url: '/api/user/sign',
    method: 'POST'
  })
}
// 签到详情
export function signInfo() {
  return request({
    url: '/api/user/sign/info',
    method: 'GET'
  })
}

// 文章，帮助，最新活动
export function getArticle(data) {
  return request({
    url: `/api/article/list?type=${data.type}`,
    method: 'GET'
  })
}


// 文章，帮助，最新活动
export function getKefu() {
  return request({
    url: `/api/app/kefu`,
    method: 'GET'
  })
}

// 币种金额转换
export function exchange(data) {
  return request({
    url: `/api/coin/exchange`,
    method: 'POST',
	data
  })
}