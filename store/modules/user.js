import {
	USER_LOGIN,
	USER_UPDATE_NAME,
	INIT_LOGIN,
	USER_LOGOUT
} from './../mutations_type'
import {
	register,
	login,
	logout,
	updatePwd,
	resetPwd,
	updateUserName,
	userInfo,
	invitInfo,
	invitUserList,
	invitRewardList,
	appConfig
} from '@/api/user'

const user = {
	state: {
		loginInfo:uni.getStorageSync('userInfo')?uni.getStorageSync('userInfo'): {
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
				uni.setStorageSync('userInfo', state.loginInfo);
			}
		},
		[USER_UPDATE_NAME](state, payload) {
			let loginInfo = uni.getStorageSync('userInfo')
			loginInfo.name = payload.name
			uni.setStorageSync('userInfo', loginInfo);
			state.loginInfo = loginInfo
		},
		[INIT_LOGIN](state, payload) {
			const loginInfo = uni.getStorageSync('userInfo');
			if (loginInfo) {
				state.loginInfo = loginInfo
			}
		},
		[USER_LOGOUT](state, payload) {
			uni.setStorageSync('token', '');
			uni.setStorageSync('userInfo', '');
			// uni.removeStorageSync('userInfo')
			state.loginInfo = {
				nickname: null,
				profile: null,
				hasLogin: false
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
			return new Promise((resolve, reject) => {
				logout().then(res => {
					commit(USER_LOGOUT)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
			
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
		resetPwd({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				resetPwd(data).then(res => {
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
