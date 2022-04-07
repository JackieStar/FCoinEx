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