<template>
	<layout-default>

		<view>
			<u-sticky h5-nav-height="0">
				<view>
					<view class="y-system-height bg-white"></view>
					<view class="bg-white y-flex y-font-size-26 y-p-y-20 y-p-x-30 y-align-center y-justify-between"
						style="box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.07);">
						<view class="w-90 y-flex y-justify-end" @click="isEdit = !isEdit">
							<span v-if="!isEdit">编辑</span>
							<span v-else>取消</span>
						</view>
						<view class="y-weight-bold y-font-size-32">
							购物车
						</view>
						<view class="w-90"></view>
					</view>
				</view>
			</u-sticky>
			<view>
				<view class="store-list y-p-30">
					<view class="bg-white store-single y-p-30 y-m-b-30 y-radius-30"
						v-for="(storeItem, storeIndex) in shoppingCart" :key="storeIndex">
						<view @click="storeSelBtn(storeIndex)" class="store-header y-flex y-align-center">
							<view class="sel-btn y-p-t-5">
								<u-icon v-if="(storeItem.isBuySelect && !isEdit) || (storeItem.isDelSelect && isEdit)"
									name="checkmark-circle-fill" color="#04BE02" size="40rpx"></u-icon>
								<view v-else class="no-select"></view>
							</view>
							<span class="y-font-size-30 y-m-l-13 y-m-r-10">{{storeItem.storeName}}</span>
							<u-icon name="arrow-right"></u-icon>
						</view>
						<view class="goods-list y-p-l-20">
							<view class="goods-item y-flex y-p-t-20"
								v-for="(goodsItem, goodsIndex) in storeItem.goodsList" :key="goodsIndex">
								<view @click="goodsSelBtn(storeIndex, goodsIndex)" class="y-flex y-align-center">
									<view class="sel-btn">
										<u-icon
											v-if="(goodsItem.isBuySelect && !isEdit) || (goodsItem.isDelSelect && isEdit)"
											name="checkmark-circle-fill" color="#04BE02" size="40rpx"></u-icon>
										<view v-else class="no-select"></view>
									</view>
								</view>
								<view class="y-m-l-15">
									<u-image :src="goodsItem.image" radius="10rpx" width="162rpx" height="162rpx">
									</u-image>
								</view>
								<view class="y-m-l-28 y-flex y-flex-1 y-flex-column">
									<view class="y-flex-1">
										<view class="goods-name y-font-size-28"> {{goodsItem.goodsName}} </view>
										<!-- <view class="goods-attr y-flex y-m-t-15">
											<u-tag v-if="goodsItem.attrList.length > 0"
												:text="goodsItem.attrList.join(';')" plain size="mini" type="primary">
											</u-tag>
											<u-tag v-else text="默认规格" plain size="mini" type="primary"></u-tag>
										</view> -->
									</view>
									<view class="goods-price y-flex y-align-end y-flex-1">
										<view class="y-flex-1 y-font-size-30 y-weight-bold color-price"> ￥
											{{goodsItem.price}}
										</view>
										<view>
											<u-number-box size="18" v-model="goodsItem.count"
												@change="countChange(storeIndex, goodsIndex)"></u-number-box>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 120rpx;"></view>
			</view>
			<view class="y-position-fixed y-bottom-0 y-left-0 y-right-0 y-p-y-20 y-p-x-30 bg-white y-flex"
				style="bottom: 50px;">
				<view class="y-flex y-flex-1 y-align-center">
					<view @click="allSelBtn()" class="store-header y-flex y-align-center">
						<view class="sel-btn y-p-t-5">
							<u-icon v-if="allSelState" name="checkmark-circle-fill" color="#04BE02" size="40rpx">
							</u-icon>
							<view v-else class="no-select"></view>
						</view>
						<span class="y-font-size-28 y-m-l-10">全选</span>
					</view>
				</view>
				<view class="y-flex y-align-center y-font-size-28">
					<view v-if="!isEdit" class="y-font-size-33"> 总计: <span class="color-price y-weight-bold y-m-l-8">￥
							{{totalPrice}} </span> </view>
					<view class="y-flex y-m-l-25">
						<u-button v-if="!isEdit" shape="circle" :hair-line="false" :customStyle="submitBtnStyle"> 结算(
							{{totalSelCount}} )
						</u-button>
						<u-button v-else shape="circle" :hair-line="false" :customStyle="submitBtnStyle"> 删除(
							{{totalSelCount}} )
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</layout-default>
</template>

<script>
	import {
		http
	} from '@/utils/http.js'
	import LayoutDefault from '@/layouts/default/index.vue'
	export default {
		name: 'UserCart',
		components: {
			LayoutDefault,
		},
		data() {
			return {
				isEdit: false, //是否编辑（购物/编辑）
				shoppingCart: [], //购物车数据
				submitBtnStyle: {
					background: '#FD7026',
					color: '#ffffff',
					border: 'none'
				} //结算、删除按钮的样式
			}
		},
		created() {
			this.$store.commit('page/TOGGLE_MID_BUTTON')
		},
		beforeDestroy() {
			this.$store.commit('page/TOGGLE_MID_BUTTON')
		},
		computed: {
			//是否已经全部选中
			allSelState() {
				let buyAllSelect = true // 购物全选
				let delAllSelect = true // 编辑全选
				this.shoppingCart.forEach(sitem => {
					sitem.goodsList.forEach(gitem => {
						if (!gitem.isBuySelect) buyAllSelect = false;
						if (!gitem.isDelSelect) delAllSelect = false;
					})
				})
				if (!this.isEdit) return buyAllSelect;
				else return delAllSelect;
			},
			//总价格
			totalPrice() {
				let totalPrice = 0
				this.shoppingCart.forEach(sitem => {
					sitem.goodsList.forEach(gitem => {
						if (gitem.isBuySelect) {
							totalPrice = totalPrice * 1 + gitem.price * gitem.count
						}
					})
				})
				return totalPrice
			},
			//当前操作下选中的数量
			totalSelCount() {
				let buyCount = 0 // 购物全选
				let delCount = 0 // 编辑全选
				this.shoppingCart.forEach(sitem => {
					sitem.goodsList.forEach(gitem => {
						if (gitem.isBuySelect) {
							buyCount = buyCount * 1 + gitem.count
						}
						if (gitem.isDelSelect) {
							delCount = delCount * 1 + 1
						}
					})
				})
				if (!this.isEdit) {
					return buyCount
				} else {
					return delCount
				}
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			//请求数据。。。
			async getData() {
				const res = await http.get('/cartList')
				let goodsList = {}
				res.data.result.records.map(e => {
					if (!goodsList[e.sellerName]) {
						goodsList[e.sellerName] = {
							id: e.sellerId,
							storeName: `${e.sellerName}的小店`,
							isDelSelect: false,
							isBuySelect: false,
							goodsList: []
						}
					}
					goodsList[e.sellerName].goodsList.push({
						id: e.goodId,
						goodsName: e.summary,
						image: e.cover,
						price: Number(e.price).toFixed(2),
						count: e.count,
						isDelSelect: false,
						isBuySelect: false,
					})
				})
				// for (let i = 0; i < 3; i++) {
				// 	let goodsList = []
				// 	for (let j = 0; j < 2; j++) {
				// 		let obj = {
				// 			id: i + i + j + j + '',
				// 			goodsName: '商品名称',
				// 			image: 'https://cdn.uviewui.com/uview/album/1.jpg',
				// 			price: 222,
				// 			attrList: ['白色', '24码'],
				// 			count: 1,
				// 			isDelSelect: false,
				// 			isBuySelect: false,
				// 		}
				// 		goodsList.push(obj)
				// 	}
				// 	this.shoppingCart.push({
				// 		id: i + i + '',
				// 		storeName: '商店名称旗舰店',
				// 		isDelSelect: false,
				// 		isBuySelect: false,
				// 		goodsList: goodsList
				// 	})
				// }

				this.shoppingCart = Object.values(goodsList)
			},
			//商家的选中与否
			storeSelBtn(storeIndex) {
				if (!this.isEdit) { //购物
					this.shoppingCart[storeIndex].isBuySelect = !this.shoppingCart[storeIndex].isBuySelect
					this.shoppingCart[storeIndex].goodsList.forEach(item => {
						item.isBuySelect = this.shoppingCart[storeIndex].isBuySelect
					})
				} else { //编辑
					this.shoppingCart[storeIndex].isDelSelect = !this.shoppingCart[storeIndex].isDelSelect
					this.shoppingCart[storeIndex].goodsList.forEach(item => {
						item.isDelSelect = this.shoppingCart[storeIndex].isDelSelect
					})
				}
			},
			//商品的选中与否
			goodsSelBtn(storeIndex, goodsIndex) {
				if (!this.isEdit) { //购物
					this.shoppingCart[storeIndex].goodsList[goodsIndex].isBuySelect = !this.shoppingCart[storeIndex]
						.goodsList[goodsIndex].isBuySelect
					let allIsSel = true //是否已经全部选中
					this.shoppingCart[storeIndex].goodsList.forEach(item => {
						if (!item.isBuySelect) {
							allIsSel = false
						}
					})
					this.shoppingCart[storeIndex].isBuySelect = allIsSel
				} else { //编辑
					this.shoppingCart[storeIndex].goodsList[goodsIndex].isDelSelect = !this.shoppingCart[storeIndex]
						.goodsList[goodsIndex].isDelSelect
					let allIsSel = true //是否已经全部选中
					this.shoppingCart[storeIndex].goodsList.forEach(item => {
						if (!item.isDelSelect) {
							allIsSel = false
						}
					})
					this.shoppingCart[storeIndex].isDelSelect = allIsSel
				}
			},
			//全选
			allSelBtn() {
				let toState = !this.allSelState
				if (!this.isEdit) { //购物
					this.shoppingCart.forEach(sitem => {
						sitem.isBuySelect = toState
						sitem.goodsList.forEach(gitem => {
							gitem.isBuySelect = toState
						})
					})
				} else { //编辑
					this.shoppingCart.forEach(sitem => {
						sitem.isDelSelect = toState
						sitem.goodsList.forEach(gitem => {
							gitem.isDelSelect = toState
						})
					})
				}
			},
			//商品的数量增减
			countChange(storeIndex, goodsIndex) {
				//请求后台改变购物车商品的数量。。。storeIndex, goodsIndex
			}
		}
	}
</script>

<style>
	page {
		color: #333333;
	}
</style>

<style lang="scss" scoped>
	.bg-white {
		background: #ffffff;
	}

	/*常见样式, 对于uview的内置样式的不足的补全以及通用样式的补充*/
	.y-position-fixed {
		position: fixed;
	}

	.y-top-0 {
		top: 0;
	}

	.y-bottom-0 {
		bottom: 0;
	}

	.y-left-0 {
		left: 0;
	}

	.y-right-0 {
		right: 0;
	}

	.y-flex-column {
		flex-direction: column !important;
	}

	.y-w-100 {
		width: 100%;
	}

	/*系统状态栏高度*/
	.y-system-height {
		height: var(--status-bar-height);
	}

	/* 圆角大小例：radius-1 ,radius-10... */
	@for $i from 1 through 50 {
		.y-radius-#{$i} {
			border-radius: $i*1rpx;
		}

		/* margin */
		.y-m-t-#{$i} {
			margin-top: $i*1rpx;
		}

		.y-m-b-#{$i} {
			margin-bottom: $i*1rpx;
		}

		.y-m-l-#{$i} {
			margin-left: $i*1rpx;
		}

		.y-m-r-#{$i} {
			margin-right: $i*1rpx;
		}

		.y-m-x-#{$i} {
			margin-left: $i*1rpx;
			margin-right: $i*1rpx;
		}

		.y-m-y-#{$i} {
			margin-top: $i*1rpx;
			margin-bottom: $i*1rpx;
		}

		.y-m-#{$i} {
			margin: $i*1rpx;
		}

		/* padding */
		.y-p-t-#{$i} {
			padding-top: $i*1rpx;
		}

		.y-p-b-#{$i} {
			padding-bottom: $i*1rpx;
		}

		.y-p-l-#{$i} {
			padding-left: $i*1rpx;
		}

		.y-p-r-#{$i} {
			padding-right: $i*1rpx;
		}

		.y-p-x-#{$i} {
			padding-left: $i*1rpx;
			padding-right: $i*1rpx;
		}

		.y-p-y-#{$i} {
			padding-top: $i*1rpx;
			padding-bottom: $i*1rpx;
		}

		.y-p-#{$i} {
			padding: $i*1rpx;
		}

		/* font-size */
		.y-font-size-#{$i} {
			font-size: $i*1rpx;
		}
	}

	/* 自体加粗例：weight-100 ,weight-150 ,weight-600... */
	@for $i from 1 through 9 {
		.y-weight-#{$i*100} {
			font-weight: $i*100;
		}

		.y-weight-#{$i*100 + 50} {
			font-weight: 50 + $i*100;
		}
	}

	.y-justify-end {
		justify-content: flex-end;
	}

	.y-align-center {
		align-items: center;
	}

	.y-align-start {
		align-items: flex-start;
	}

	.y-align-end {
		align-items: flex-end;
	}

	.y-flex {
		display: flex;
	}

	.y-flex-column {
		flex-direction: column;
	}

	.y-flex-1 {
		flex: 1;
	}

	.y-justify-start {
		justify-content: flex-start;
	}

	.y-justify-end {
		justify-content: flex-end;
	}

	.y-justify-around {
		justify-content: space-around;
	}

	.y-justify-between {
		justify-content: space-between;
	}

	.y-weight-bold {
		font-weight: bold;
	}

	.y-border-bottom {
		border-bottom: 1rpx solid rgba($color: #707070, $alpha: 0.12);
	}

	.color-price {
		color: #C8222A;
	}

	.w-90 {
		width: 90rpx;
	}

	.sel-btn {
		width: 45rpx;
		height: 45rpx;
	}

	.no-select {
		width: 39rpx;
		height: 39rpx;
		border-radius: 50%;
		border: 1px solid rgb(235, 236, 238);
	}

	.store-single {
		box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.07);
	}
</style>
