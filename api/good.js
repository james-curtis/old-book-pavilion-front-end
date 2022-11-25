import {
	http
} from '@/utils/http.js'

const Api = {
	QUERY: '/pavilion/pavilionGood/list',
	GET: '/pavilion/pavilionGood/queryById',
}


/**
 * @description 测试
 * @deprecated
 */
export function goodQueryApi(pageNo, pageSize, name = '') {
	return http.get(Api.QUERY, {
		params: {
			pageNo,
			pageSize,
			name
		}
	})
}

/**
 * @description 测试
 * @deprecated
 */
export function goodGetApi(id) {
	return http.get(Api.GET, {
		params: {
			id
		}
	})
}
