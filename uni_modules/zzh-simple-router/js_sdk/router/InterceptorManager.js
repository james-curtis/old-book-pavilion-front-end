'use strict'

function InterceptorManager() {
	this.handlers = []
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled) {
	this.handlers.push({
		fulfilled: fulfilled
	})
	return this.handlers.length - 1
}

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
	if (this.handlers[id]) {
		this.handlers[id] = null
	}
}

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
	this.handlers.forEach(h => {
		if (h !== null) {
			fn(h)
		}
	})
}
/* 翻转前置拦截器数组，保证执行顺序和注册的前置拦截器顺序一致 */
InterceptorManager.prototype.reverseForEach = function forEach(fn) {
	this.handlers.reverse().forEach(h => {
		if (h !== null) {
			fn(h)
		}
	})
}
export default InterceptorManager
