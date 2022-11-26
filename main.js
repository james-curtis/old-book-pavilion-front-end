import App from './App'
import Vue from 'vue'
import uView from './plugins/uView.js'
import tuniaoUI from './plugins/tuniaoUI.js'
import store from './plugins/store.js'
import dayjs from './plugins/dayjs.js'

Vue.use(uView)
Vue.use(store)
Vue.use(dayjs)
Vue.use(tuniaoUI)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
