const state = {
	/**
	 * @link https://v1.uviewui.com/components/tabbar.html#%E5%AE%9E%E6%88%98%E6%95%99%E7%A8%8B
	 */
	pageList: [{
			iconPath: 'home',
			selectedIconPath: 'home-fill',
			text: '首页',
			pagePath: "/pages/index/index"
		},
		{
			iconPath: 'shopping-cart',
			selectedIconPath: 'shopping-cart-fill',
			text: '购物车',
			pagePath: "/pages/index/cart"
		},
		{
			iconPath: "/static/footer/min_button.png",
			selectedIconPath: "/static/footer/min_button_select.png",
			text: '卖书',
			midButton: true,
			pagePath: "/pages/index/publish",
		},
		{
			iconPath: 'chat',
			selectedIconPath: 'chat-fill',
			text: '消息',
			pagePath: "/pages/user/message"
		},
		{
			iconPath: 'account',
			selectedIconPath: 'account-fill',
			text: '我的',
			pagePath: "/pages/user/index"
		},
	],
	currentTab: 0
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
