import Vue from 'vue'
import Vuex from 'vuex'

import page from './modules/page'
import user from './modules/user'
import config from './modules/config'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		page,
		user,
		config,
	},
	strict: true
})

export default store
