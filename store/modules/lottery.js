import {
	lotteryConfig, 
	lotteryDraw,
} from '@/api/lottery'
import {} from './../mutations_type'


const lottery = {
	state: {

	},

	mutations: {

	},

	actions: {
		lotteryConfig({
			commit
		},data) {
			return new Promise((resolve, reject) => {
				lotteryConfig(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		lotteryDraw({
			commit
		},data) {
			return new Promise((resolve, reject) => {
				lotteryDraw(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default lottery
