<template>
	<u-search :placeholder='placeholder' v-model='searchPwd' @click='onClick' :margin='margin' :disabled='disabled'
		:show-action='!disabled'>
	</u-search>
</template>

<script>
	export default {
		name: 'SearchBar',
		data() {
			return {
				placeholder: '书名/作者/ISBN',
				searchPwd: ''
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
			}
		},
		methods: {
			onClick(e) {
				this.$emit('click', e)
			}
		},
	}
</script>

<style lang="scss">
</style>
