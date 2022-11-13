import {
	http
} from '@/utils/http.js'

const Api = {
	SWIPE_LIST: '/pavilion/pavilionBook/list',
	GUESS_LIKE: '/pavilion/pavilionGood/list',
	LATEST_GOODS: '/pavilion/pavilionGood/list',
	HOT_GOODS: '/pavilion/pavilionGood/list',
	SALE_GOODS: '/pavilion/pavilionGood/list',
}

/**
 * @description 测试
 * @deprecated
 */
export function bannerListApi() {
	return http.get(Api.SWIPE_LIST)
}


/**
 * @description 测试
 * @deprecated
 */
export function guessLikeApi(page, size) {
	return http.get(Api.GUESS_LIKE)
}


/**
 * @description 测试
 * @deprecated
 */
export function latestGoodsApi() {
	return http.get(Api.LATEST_GOODS)
}

/**
 * @description 测试
 * @deprecated
 */
export function hotGoodsApi() {
	return http.get(Api.HOT_GOODS)
}

/**
 * @description 测试
 * @deprecated
 */
export function saleGoodsApi() {
	return http.get(Api.SALE_GOODS)
}
