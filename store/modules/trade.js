import {
	getProductLine,
	getProductList,
	productInfo,
	submitOrder,
	orderList
} from '@/api/trade'
// import {} from './../mutations_type'


const trade = {
	state: {

	},

	mutations: {

	},

	actions: {
		getProductLine({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				getProductLine(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getProductList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				getProductList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		productInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				productInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		submitOrder({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				submitOrder(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		orderList({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				orderList(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		
	}
}

export default trade
