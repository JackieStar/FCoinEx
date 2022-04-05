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
		}) {
			return new Promise((resolve, reject) => {
				lotteryConfig().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		lotteryDraw({
			commit
		}) {
			return new Promise((resolve, reject) => {
				lotteryDraw().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default lottery
