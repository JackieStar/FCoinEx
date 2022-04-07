import {
	getProductLine,
	getProductList,
	productInfo
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
		}
	}
}

export default trade
