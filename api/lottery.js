import request from '@/utils/request'

// 配置列表
export function lotteryConfig() {
  return request({
    url: '/api/user/lottery/newbee',
    method: 'GET'
  })
}
// 抽奖
export function lotteryDraw(data) {
  return request({
    url: '/api/user/lottery/newbee-get',
    method: 'POST',
	data
  })
}

// 抽奖次数
export function lotteryCount() {
  return request({
    url: '/v1/lottery/count',
    method: 'GET'
  })
}