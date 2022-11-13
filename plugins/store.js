import store from '@/store/index.js'

export default {
	install(vue) {
		vue.prototype.$store = store
	}
}
