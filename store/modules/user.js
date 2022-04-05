import {
	USER_LOGIN,
	USER_UPDATE_NAME,
	INIT_LOGIN,
	USER_LOGOUT,
	USER_UPDATE_PAY_PWD,
	USER_ENABLE_GOOGLE,
	USER_DISABLE_GOOGLE
} from './../mutations_type'
import {
	register,
	login,
	updatePayPwd,
	updatePwd,
	updateUserName,
	userInfo,
	withdraw,
	withdrawList,
	rechargeList,
	getFinaceInfo,
	financeRecharge,
	invitInfo,
	invitUserList,
	invitRewardList,
	appConfig
} from '@/api/user'

const user = {
	state: {
		loginInfo: {
			nickname: null,
			profile: null,
			hasLogin: false,
		}
	},

	mutations: {
		[USER_LOGIN](state, payload) {
			if (payload.code == 200) {
				state.loginInfo = payload.data
				state.loginInfo.hasLogin = true
				uni.setStorageSync('token', payload.data.token);
				uni.setStorageSync('loginInfo', JSON.stringify(state.loginInfo));
			}
		},
		[USER_UPDATE_NAME](state, payload) {
			let loginInfo = JSON.parse(uni.getStorageSync('loginInfo'))
			loginInfo.name = payload.name
			uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
			state.loginInfo = loginInfo
		},
		[INIT_LOGIN](state, payload) {
			const loginInfo = uni.getStorageSync('loginInfo');
			if (loginInfo) {
				state.loginInfo = JSON.parse(loginInfo)
			}
		},
		[USER_LOGOUT](state, payload) {
			uni.setStorageSync('token', '');
			uni.setStorageSync('loginInfo', '');
			state.loginInfo = {
				nickname: null,
				profile: null,
				hasLogin: false
			}
		},
		[USER_UPDATE_PAY_PWD](state, payload) {
			if (payload.code == 200) {
				state.loginInfo.isCapitalPasswd = true

			}
		}
	},

	actions: {
		initLogin({
			commit
		}, data) {
			commit(INIT_LOGIN)
		},
		hasLogin() {
			const token = uni.getStorageSync('token');
			if (token != undefined && token != null && token != '') {
				return true;
			}
			return false;
		},
		// 注册
		register({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				register(data).then(res => {
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		login({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				login(data).then(res => {
					console.log('res', res)
					commit(USER_LOGIN, res)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		logout({
			commit
		}) {
			commit(USER_LOGOUT)
		},
		updatePwd({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				updatePwd(data).then(res => {
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateUserName({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				updateUserName(data).then(res => {
					commit(USER_UPDATE_NAME, data)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		userInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				userInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		
		withdraw({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				withdraw(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getFinaceInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				getFinaceInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		financeRecharge({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				financeRecharge(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		withdrawList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				withdrawList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		rechargeList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				rechargeList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		invitInfo({
			commit
		}) {
			return new Promise((resolve, reject) => {
				invitInfo().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		invitUserList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				invitUserList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		invitRewardList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				invitRewardList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		appConfig({
			commit
		}) {
			return new Promise((resolve, reject) => {
				appConfig().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}

export default user
