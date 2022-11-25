import {
	http
} from '@/utils/http.js'

const Api = {
	QUERY: '/pavilion/pavilionBook/list',
	GET: '/pavilion/pavilionBook/queryById',
}


/**
 * @description 测试
 * @deprecated
 */
export function bookQueryApi(pageNo, pageSize, name = '') {
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
export function bookGetApi(id) {
	return http.get(Api.GET, {
		params: {
			id
		}
	})
}
