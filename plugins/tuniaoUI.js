import Vue from 'vue'

// 引入全局TuniaoUI
import TuniaoUI from '@/uni_modules/tuniao-ui'
Vue.use(TuniaoUI)

// 引入TuniaoUI提供的vuex简写方法
let vuexStore = require('@/mixins/$t.mixin.js')
Vue.mixin(vuexStore)

// 引入TuniaoUI对小程序分享的mixin封装
let mpShare = require('@/uni_modules/tuniao-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)

export default {
	install(vue) {}
}
