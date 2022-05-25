import request from '@/utils/request'

// 注册
export function register(data) {
	return request({
		url: '/api/register',
		method: 'POST',
		data: data
	})
}
//登录
export function login(data) {
	return request({
		url: '/api/login',
		method: 'POST',
		data: data
	})
}

export function logout() {
	return request({
		url: '/api/logout',
		method: 'POST'
	})
}
//修改密码
export function updatePwd(data) {
	return request({
		url: '/api/user/change-pwd',
		method: 'POST',
		data: data
	})
}
//修改密码
export function resetPwd(data) {
	return request({
		url: '/api/reset-pwd',
		method: 'POST',
		data: data
	})
}
//昵称
export function updateUserName(data) {
	return request({
		url: '/api/user/change-name',
		method: 'POST',
		data: data
	})
}
// 用户信息
export function userInfo(data) {
	return request({
		url: '/api/user/info',
		method: 'POST',
		data: data
	})
}

//邀请信息
export function invitInfo() {
	return request({
		url: `/api/user/invite/info`,
		method: 'GET'
	})
}
//邀请记录
export function invitUserList() {
	return request({
		url: '/api/user/invite/logs',
		method: 'GET'
	})
}
//邀请奖励记录
export function invitRewardList() {
	return request({
		url: '/api/user/invite/reward-logs',
		method: 'GET'
	})
}
// 站点链接
export function appConfig() {
	return request({
		url: '/api/app/config',
		method: 'GET'
	})
}

// 认证详情
export function authInfo() {
	return request({
		url: '/api/user/certification/info',
		method: 'GET'
	})
}
// 提交认证
export function authSave(data) {
	return request({
		url: '/api/user/certification/add',
		method: 'POST',
		data: data
	})
}