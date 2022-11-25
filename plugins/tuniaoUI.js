// 引入全局TuniaoUI
import TuniaoUI from '@/uni_modules/tuniao-ui'

export default {
	install(vue) {
		vue.use(TuniaoUI)

		// 引入TuniaoUI提供的vuex简写方法
		let vuexStore = require('@/store/$t.mixin.js')
		vue.mixin(vuexStore)
	}
}
