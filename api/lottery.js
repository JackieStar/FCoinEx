import request from '@/utils/request'

// 配置列表
export function lotteryConfig(data) {
  return request({
    url: `/api/user/lucky/info?type=${data.type}`,
    method: 'GET'
  })
}
// 抽奖
export function lotteryDraw(data) {
  return request({
    url: '/api/user/lucky/get',
    method: 'POST',
	data
  })
}
