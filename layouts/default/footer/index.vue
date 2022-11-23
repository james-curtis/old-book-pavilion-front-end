<template>
	<u-tabbar class='footer-tabbar' :list='pageList' v-model='current' :mid-button='true'></u-tabbar>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		name: 'LayoutDefaultFooter',
		components: {},
		data() {
			return {
				current: 0,
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		computed: {
			...mapState({
				pageList: s => s.page.pageList
			})
		},
		watch: {
			current: {
				immediate: true,
				handler(val) {
					this.setPageState({
						currentTab: val
					})
				}
			}
		},
		mounted() {},
		methods: {
			...mapMutations({
				setPageState: 'page/SET'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.footer-tabbar {

		// 防止中间凸出按钮遮挡图层
		/deep/ .u-fixed-placeholder.safe-area-inset-bottom {
			// height: 50rpx #{!important};
		}
	}
</style>
