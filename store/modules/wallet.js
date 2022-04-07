import {
	getAccountLogs,
	withdraw,
	withdrawFee,
	withdrawList,
	rechargeList,
	getFinaceInfo,
	financeRecharge,
} from '@/api/wallet'
// import {} from './../mutations_type'


const wallet = {
	state: {

	},

	mutations: {

	},

	actions: {
		getAccountLogs({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				getAccountLogs(data).then(res => {
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
		withdrawFee({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				withdrawFee(data).then(res => {
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
		}
		
	}
}

export default wallet
