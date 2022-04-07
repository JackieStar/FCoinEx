import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import common from './modules/common'
import websocket from './modules/websocket'
import lottery from './modules/lottery'
import trade from './modules/trade'
import wallet from './modules/wallet'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	websocket: websocket,
	user: {
	  namespaced: true,
	  ...user
	},
	common: {
	  namespaced: true,
	  ...common
	},
	lottery: {
	  namespaced: true,
	  ...lottery
	},
	trade: {
		namespaced: true,
		...trade
	},
	wallet: {
		namespaced: true,
		...wallet
	}
  }
})

export default store
