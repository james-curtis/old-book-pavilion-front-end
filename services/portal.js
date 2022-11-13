import {
	bannerListApi,
	guessLikeApi,
	latestGoodsApi,
	hotGoodsApi,
	saleGoodsApi
} from '@/api/portal.js'

export async function bannerList() {
	const res = await bannerListApi()
	// 做些什么...
	const data = res.data.result
	return data
}


export async function guessLike(page, size) {
	const res = await guessLikeApi(page, size)
	// 做些什么...
	const data = res.data.result
	return data
}



export async function latestGoods() {
	const res = await latestGoodsApi()
	// 做些什么...
	const data = res.data.result
	return data
}



export async function hotGoods() {
	const res = await hotGoodsApi()
	// 做些什么...
	const data = res.data.result
	return data
}


export async function saleGoods() {
	const res = await saleGoodsApi()
	// 做些什么...
	const data = res.data.result
	return data
}
