import request from '@/utils/request'

//帐变记录
export function getAccountLogs(data) {
  return request({
    url: '/api/user/finance/account-logs',
    method: 'GET',
	data
  })
}

//提币记录
export function withdrawList(data) {
	return request({
		url: '/api/user/finance/withdraw-logs',
		method: 'GET',
		data
	})
}

//充值记录
export function rechargeList(data) {
	return request({
		url: '/api/user/finance/recharge-logs',
		method: 'GET',
		data
	})
}
// 计算手续费
export function withdrawFee(data) {
	return request({
		url: `/api/user/finance/withdraw-fee`,
		method: 'POST',
		data
	})
}

//提现
export function withdraw(data) {
	return request({
		url: '/api/user/finance/withdraw',
		method: 'POST',
		data
	})
}

// 充值信息
export function getFinaceInfo(data) {
	return request({
		url: `/api/user/finance/config`,
		method: 'GET',
		data
	})
}
// 提交充值
export function financeRecharge(data) {
	return request({
		url: `/api/user/finance/recharge`,
		method: 'POST',
		data
	})
}