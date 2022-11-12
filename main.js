import App from './App'
import Vue from 'vue'
import uView from './plugins/uView.js'
import store from './plugins/store.js'

Vue.use(uView)
Vue.use(store)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
