import {
	goodQueryApi,
	goodGetApi,
} from '@/api/good.js'
import setting from '@/hooks/setting'

const {
	pageSize: pageSizeDefault
} = setting.usePageSetting()

export async function goodList(pageNo, pageSize = pageSizeDefault) {
	const res = await goodQueryApi()
	// 做些什么...
	const data = res.data.result
	return data
}


export async function getGood(id) {
	const res = await goodGetApi(id)
	// 做些什么...
	const data = res.data.result
	return data
}
