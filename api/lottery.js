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
