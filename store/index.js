import Vue from 'vue'
import Vuex from 'vuex'
import tuniao from './tuniao.js'

import page from './modules/page'
import user from './modules/user'
import appConfig from './modules/appConfig'

Vue.use(Vuex)
const store = new Vuex.Store({
	...tuniao,
	modules: {
		page,
		user,
		appConfig,
	},
	strict: true
})

export default store
