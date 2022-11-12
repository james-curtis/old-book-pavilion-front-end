import Check from './check'
import InterceptorManager from './InterceptorManager.js'

let router_this = null

function _nav({
	type = 'navigateTo',
	url = '',
	delta = '',
	isEncode = false,
	query = {},
	params = {},
	conf = {}
}) {
	const queryStr = isEncode ? encodeURIComponent(JSON.stringify(query)) : JSON.stringify(query)

	//跳转tab页不能携带参数，只能纯路径
	let hasQuery = Check.isPlainObject(query) ? url :
		`${url}${url.includes('?')? '&': '?'}encode=${isEncode ? 1: 0}&qryStr=${queryStr}`
	const arg = arguments[0]
	return new Promise((resolve, reject) => {
		let config = {
			...conf,
			success(res) {
				resolve({
					config: arg,
					...res
				})
			},
			fail(err) {
				resolve({
					config: arg,
					errCode: 400,
					...err
				})
			}
		}
		delta ? (config.delta = delta) : (config.url = hasQuery)
		uni[type](config)
	})
}

/**
 * @param {String} fullPath 全路径 pages/home/index
 * @param {String} relative 相对路径./index2 
 * @return {String} 根据全路径返回当前相对路径的完整路径 输入../index2  返回类似 /pages/home/index2 
 */
function getAbsolutePath(relative, fullPath) {
	if (relative.startsWith('/')) return relative
	if (!relative.startsWith('.')) return '/' + relative

	const stack = fullPath.split('/'),
		parts = relative.split('/')
	stack.pop() // 移除当前项 (或者空字符)
	for (let i = 0; i < parts.length; i++) {
		if (parts[i] == '.')
			continue
		if (parts[i] == '..')
			stack.pop()
		else
			stack.push(parts[i])
	}
	return '/' + stack.join('/')
}


class Router {
	constructor() {
		router_this = this
		this.pageParams = new Map()
		this.beforeInterceptor = new InterceptorManager()
		this.afterInterceptor = new InterceptorManager()
		this.errInterceptor = new InterceptorManager()
		this.before = (arg) => this.beforeInterceptor.use(arg)
		this.after = (arg) => this.afterInterceptor.use(arg)
		this.errMiddleware = (arg) => arg

		const methods = [
			'navigateTo',
			'redirectTo',
			'reLaunch',
			'switchTab',
			'navigateBack'
		]
		methods.forEach(method => {
			Router.prototype[method] = function(args, conf = {}) {
				return this._push.apply(this, [args, conf, method])
			}
		})
	}
	/**
	 * @param { Object|Number|Sting } user_conf 传url,query,params 路径和参数,query类似get，params类似post。刷新丢失
	 * @param {Object} uni_conf 额外配置，配置同uni原生跳转的其它参数
	 * @return {promise}
	 */
	to(user_conf, uni_conf = {}) {
		return this._push(user_conf, uni_conf, 'navigateTo')
	}


	_getCurrent(current = 1) {
		const routers = this.curPage()
		if (routers.length > 0) {
			return routers[
				routers.length - current < 0 ? 0 : routers.length - current
			]
		}
		throw new Error('未发现页面堆栈')
	}

	_push(user_conf, uni_conf = {}, type) {
		let queryObj = {},
			paramsObj = {},
			url,
			isEncode,
			deltaNums;
		switch (true) {
			case Check.isObject(user_conf):

				const {
					params = {}, query = {}, delta
				} = user_conf

				if (!Check.isObject(params) || !Check.isObject(query)) {
					throw new Error('params数据必须是Object')
				}
				if (!delta) {
					url = user_conf.url
					queryObj = query
					isEncode = user_conf.encode || user_conf.isEncode || true
					paramsObj = params
				} else {
					let {
						route
					} = this._getCurrent(delta + 1)
					url = route
					deltaNums = delta
					paramsObj = params
				}

				break
			case Check.isString(user_conf):
				url = user_conf
				break
			case Check.isNumber(user_conf):
				let {
					route
				} = this._getCurrent(user_conf + 1)
				url = route
				deltaNums = user_conf
				break
			default:
				throw new Error('参数必须是对象，字符串')
		}

		const {
			route: fromPath
		} = this._getCurrent()
		url = getAbsolutePath(url, fromPath) //根据当前路径的全路径自动补全，将 ./或../或pages开头统一转为/pages/home
		const toPath = url.split('?')[0]
		const arg = {
			url,
			isEncode,
			delta: deltaNums,
			toPath,
			type,
			fromPath,
			query: queryObj,
			params: paramsObj,
			conf: uni_conf
		}

		this.pageParams.set(toPath, paramsObj)

		let chain = [_nav, this.errMiddleware]
		let promise = Promise.resolve(arg)

		this.beforeInterceptor.reverseForEach(function unshiftRequestInterceptors(interceptor) {
			chain.unshift(interceptor.fulfilled)
		})

		this.afterInterceptor.forEach(function pushResponseInterceptors(interceptor) {
			chain.push(interceptor.fulfilled)
		})
		while (chain.length) {
			promise = promise.then(chain.shift())
		}
		return promise
	}
	onError(fun) {
		if (fun && typeof fun !== 'function') throw new Error('传入必须为函数')
		this.errMiddleware = function(arg) {
			if (arg.errCode === 400) {
				fun(arg)
				return Promise.reject(arg)
			}
			return Promise.resolve(arg)
		}
	}
	params() { // 获取params		
		let {
			route: curPath
		} = router_this._getCurrent()
		curPath = '/' + curPath
		return router_this.pageParams.get(curPath) || {}
	}

	curPage() {
		return getCurrentPages()
	}

	query() {
		const routers = this.curPage()
		if (routers.length > 0) {
			// #ifdef VUE2
			const {
				options = {}
			} = routers[routers.length - 1]
			// #endif
			// #ifdef VUE3
			const {
				$page = {}
			} = routers[routers.length - 1]
			const options = $page.options || {}
			// #endif

			if (!options.qryStr) {
				return options
			}
			const {
				qryStr = '{}',
					encode = '1'
			} = options
			try {
				const decodeParse = encode * 1 === 1 ? JSON.parse(decodeURIComponent(qryStr)) : JSON.parse(qryStr)
				const newOptions = Object.assign({}, options)
				delete newOptions.qryStr
				delete newOptions.encode
				return Object.assign({}, newOptions, decodeParse)
			} catch (e) {
				console.warn('queryStr使用JSON.parse解析错误，返回原值，注意数据类型解析')
				return options
				//TODO handle the exception
			}
		}
		return {}
	}

	reloadPage() {
		let currPage = this._getCurrent() // curpage instance
		let isTabBar = currPage?.$page?.meta?.isTabBar
		let path = currPage.route
		if (!path) return
		if (isTabBar) {
			this.reLaunch({
				url: path,
				query: this.query(),
				params: this.params()
			})
		} else {
			this.redirectTo({
				url: path,
				query: this.query(),
				params: this.params()
			})
		}
	}
}

let instance = null
export function createRouter(arg) {
	if (instance) return instance
	instance = new Router(arg)

	return instance
}

/**
 *@description 保留当前页面，跳转到应用内的某个页面，使用navigateBack可以返回到原页面。 
 */
export const navigateTo = args => instance && instance.navigateTo(args)
export const to = args => instance && instance.navigateTo(args)
export const push = args => instance && instance.navigateTo(args)

/**
 *@description 关闭当前页面，跳转到应用内的某个页面。 跳转到 tabBar 页面只能使用 switchTab 跳转
 */
export const redirectTo = args => instance && instance.redirectTo(args)
export const replace = args => instance && instance.redirectTo(args)

/**
 *@description 关闭所有页面，打开到应用内的某个页面。
 */
export const reLaunch = args => instance && instance.reLaunch(args)

/**
 *@description 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 */
export const switchTab = args => instance && instance.switchTab(args)

/**
 *@description 返回页面
 */
export const navigateBack = args => instance && instance.navigateBack(args)
export const back = args => instance && instance.navigateBack(args)

export const params = args => instance && instance.params() // 获取页面传递的params参数
export const query = args => instance && instance.query() // 获取页面传递的query参数
/**
 * @description 刷新当前页面
 */
export const reloadPage = () => instance && instance.reloadPage()


export default Router
