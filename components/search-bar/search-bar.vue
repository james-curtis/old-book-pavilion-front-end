<template>
	<view @click='onClick'>
		<u-search :placeholder='placeholder' v-model='keyword' :margin='margin' :disabled='disabled' @search="onSearch"
			@custom="onSearch" :show-action='!disabled' :style='[style]'>
		</u-search>
	</view>
</template>

<script>
	export default {
		name: 'SearchBar',
		data() {
			return {
				placeholder: '书名/作者/ISBN',
				keyword: '',
			}
		},
		props: {
			margin: {
				type: String,
				default: '0'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			value: {
				type: String,
				default: ''
			}
		},
		watch: {
			keyword(val) {
				this.$emit('input', val)
			},
			value: {
				immediate: true,
				handler(val) {
					this.keyword = val
				}
			}
		},
		computed: {
			style() {
				return this.disabled ? ({
					'pointer-events': 'none'
				}) : ({})
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			onSearch(e) {
				this.$emit('search', e)
			}
		},
	}
</script>

<style lang="scss">
</style>
