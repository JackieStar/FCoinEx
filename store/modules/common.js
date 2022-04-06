import {
	sendSms,
	coinList,
	coinTips,
	marketList,
	adList,
	noticeList,
	uploadImg
} from '@/api/common'
import {
	COMMON_COIN_LIST,
	COMMON_CONFIG_LIST
} from './../mutations_type'


const common = {
	state: {
		coins: null,
		coinMap: {},
		commonConfigMap: {}
	},

	mutations: {
		[COMMON_COIN_LIST](state, payload) {
			if (payload.code == 200) {
				state.coins = payload.data,
					state.coins.forEach((item, i) => {
						state.coinMap[item.symbol] = item
					})
			}
		},
		[COMMON_CONFIG_LIST](state, payload) {
			if (payload.code == 200) {
				state.commonConfigMap = payload.data
			}
		}
	},

	actions: {
		coinList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				coinList().then(res => {
					commit(COMMON_COIN_LIST, res)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		coinTips({
			commit
		}, coin) {
			return new Promise((resolve, reject) => {
				coinTips(coin).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		marketList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				marketList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 邮箱验证码发送
		sendSms({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				console.log('data', data)
				sendSms(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		adList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				adList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		noticeList({
			commit
		},data) {
			return new Promise((resolve, reject) => {
				noticeList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		uploadImg({
			commit
		},data) {
			return new Promise((resolve, reject) => {
				uploadImg(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default common
