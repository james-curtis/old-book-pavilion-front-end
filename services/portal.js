import {
	bannerListApi,
	guessLikeApi
} from '@/api/portal.js'

export async function bannerList() {
	const res = await bannerListApi()
	// 做些什么...
	const data = res
	return data
}


export async function guessLike() {
	const res = await guessLikeApi()
	// 做些什么...
	const data = res
	return data
}
