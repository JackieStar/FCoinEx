import {
	getProductLine,
	getProductList,
	productInfo,
	submitOrder,
	orderList,
	orderSell,
	orderCancel,
	productPrice
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
		orderSell({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				orderSell(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		orderCancel({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				orderCancel(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		productPrice({commit},data){
			return new Promise((resolve, reject) => {
				productPrice(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default trade
