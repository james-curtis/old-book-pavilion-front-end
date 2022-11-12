<template>
	<u-tabbar :list='pageList' v-model='current' :mid-button='true'></u-tabbar>
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

<style>
</style>
