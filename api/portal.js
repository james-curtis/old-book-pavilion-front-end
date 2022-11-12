import {
	http
} from '@/utils/http.js'

const Api = {
	SWIPE_LIST: '/pavilion/pavilionBook/list',
	GUESS_LIKE: '/pavilion/pavilionBook/list',

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
export function guessLikeApi() {
	return http.get(Api.GUESS_LIKE)
}
