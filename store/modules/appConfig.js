const state = {
	portal: {
		/**
		 * @description 合作洽谈跳转链接
		 */
		cooperationLink: '',
	}
}

const mutations = {
	SET(state, obj) {
		Object.assign(state, obj)
	}
}

const actions = {

}

const getters = {}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
