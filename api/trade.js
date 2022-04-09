import request from '@/utils/request'

// k线数据
export function getProductLine(data) {
  return request({
    url: `/api/product/line?code=${data.code}&k=${data.k}`,
    method: 'GET'
  })
}
// 产品列表
export function getProductList(data) {
  return request({
    url: '/api/product/list?limit='+data.limit,
    method: 'GET'
  })
}
// 产品详情
export function productInfo(data) {
  return request({
    url: '/api/product/info',
    method: 'GET',
	data
  })
}
// 开仓买入
export function submitOrder(data) {
  return request({
    url: '/api/order/buy',
    method: 'post',
	data
  })
}
// 订单列表
export function orderList(data) {
  return request({
    url: `/api/order/list?type=${data.type}&status=${data.status}&code=${data.code}`,
    method: 'GET',
	data
  })
}
// 平仓
export function orderSell(data) {
  return request({
    url: 'api/order/sell',
    method: 'post',
	data
  })
}
