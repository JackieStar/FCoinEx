import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import common from './modules/common'
import websocket from './modules/websocket'
import finance from './modules/finance'
import lottery from './modules/lottery'
import trade from './modules/trade'
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
	finance: {
	  namespaced: true,
	  ...finance
	},
	lottery: {
	  namespaced: true,
	  ...lottery
	},
	trade: {
		namespaced: true,
		...trade
	}
  }
})

export default store
