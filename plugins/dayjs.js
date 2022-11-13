import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言

export default {
	install(vue) {
		dayjs.locale('zh-cn') // 使用本地化语言
	}
}
