import {
	bookQueryApi,
	bookGetApi,
} from '@/api/book.js'
import setting from '@/hooks/setting'

const {
	pageSize: pageSizeDefault
} = setting.usePageSetting()

export async function bookList(name, pageNo = 1, pageSize = pageSizeDefault) {
	const res = await bookQueryApi(pageNo, pageSize, name)
	// 做些什么...
	const data = res.data.result
	return data
}


export async function getbook(id) {
	const res = await bookGetApi(id)
	// 做些什么...
	const data = res.data.result
	return data
}
