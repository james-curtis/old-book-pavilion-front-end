import Vue from 'vue'
import Vuex from 'vuex'

import page from './modules/page'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		page,
	},
	strict: true
})

export default store
