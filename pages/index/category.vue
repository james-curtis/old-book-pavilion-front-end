<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索</text>
			</view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
				:scroll-into-view="itemId">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box"
				@scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item , index) in tabbar" :key="index">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
								<image class="item-menu-image" v-if="item1.icon" :src="item1.icon" mode=""></image>
								<view class="item-menu-name">{{item1.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'IndexCategory',
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				tabbar: [{
						"name": "教材",
						"foods": [{
								"name": "工学",
								"key": "A字裙",
								"cat": 10
							},
							{
								"name": "理学",
								"key": "理学",
								"cat": 10
							},
							{
								"name": "医学",
								"key": "医学",
								"cat": 10
							},
							{
								"name": "农学",
								"key": "农学",
								"cat": 10
							},
							{
								"name": "旅游",
								"key": "旅游",
								"cat": 10
							},
							{
								"name": "外语",
								"key": "外语",
								"cat": 10
							},
							{
								"name": "法律",
								"key": "法律",
								"cat": 10
							},
							{
								"name": "数理化",
								"key": "数理化",
								"cat": 10
							},
							{
								"name": "基础课",
								"key": "基础课",
								"cat": 10
							},
							{
								"name": "财经类",
								"key": "财经类",
								"cat": 10
							},
							{
								"name": "计算机",
								"key": "计算机",
								"cat": 10
							},
							{
								"name": "公共课",
								"key": "公共课",
								"cat": 10
							},
							{
								"name": "文法类",
								"key": "文法类",
								"cat": 10
							},
							{
								"name": "建筑工程",
								"key": "建筑工程",
								"cat": 10
							},
							{
								"name": "交通运输",
								"key": "交通运输",
								"cat": 10
							},
							{
								"name": "医药卫生",
								"key": "医药卫生",
								"cat": 10
							},
							{
								"name": "电工电子",
								"key": "电工电子",
								"cat": 10
							},
							{
								"name": "中职教材",
								"key": "中职教材",
								"cat": 10
							},
							{
								"name": "经济管理类",
								"key": "经济管理类",
								"cat": 10
							},
							{
								"name": "大学生素质教育",
								"key": "大学生素质教育",
								"cat": 10
							},
							{
								"name": "高职高专教材",
								"key": "高职高专教材",
								"cat": 10
							},
							{
								"name": "成人教育教材",
								"key": "成人教育教材",
								"cat": 10
							},
							{
								"name": "职业技术培训教材",
								"key": "职业技术培训教材",
								"cat": 10
							},
							{
								"name": "研究生/本科/专科教材",
								"key": "研究生/本科/专科教材",
								"cat": 10
							}
						]
					},
					{
						"name": "成功/励志",
						"foods": [{
								"name": "人际交往",
								"key": "人际交往",
								"cat": 6
							},
							{
								"name": "礼仪",
								"key": "礼仪",
								"cat": 6
							},
							{
								"name": "人生哲学",
								"key": "人生哲学",
								"cat": 6
							},
						]
					},
					{
						"name": "文艺",
						"foods": [{
								"name": "摄影",
								"key": "摄影",
								"cat": 3
							},
							{
								"name": "艺术",
								"key": "艺术",
								"cat": 3
							},
							{
								"name": "传记",
								"key": "传记",
								"cat": 3
							},
							{
								"name": "文学",
								"key": "文学",
								"cat": 3
							},
						]
					},
					{
						"name": "童书",
						"foods": [{
								"name": "3-6岁",
								"key": "3-6岁",
								"cat": 4
							},
							{
								"name": "0-2岁",
								"key": "0-2岁",
								"cat": 4
							},
							{
								"name": "英语",
								"key": "英语",
								"cat": 4
							},
							{
								"name": "文学",
								"key": "文学",
								"cat": 4
							},
							{
								"name": "绘本",
								"key": "绘本",
								"cat": 4
							},
							{
								"name": "11-14岁",
								"key": "11-14岁",
								"cat": 4
							},
							{
								"name": "7-10岁",
								"key": "7-10岁",
								"cat": 4
							},
							{
								"name": "科普/百科",
								"key": "科普/百科",
								"cat": 4
							},
						]
					},
					{
						"name": "人文社科",
						"foods": [{
								"name": "心理学",
								"key": "心理学",
								"cat": 12
							},
							{
								"name": "社会科学",
								"key": "社会科学",
								"cat": 12
							},
							{
								"name": "法律",
								"key": "法律",
								"cat": 12
							},
							{
								"name": "文化",
								"key": "文化",
								"cat": 12
							},
							{
								"name": "古籍",
								"key": "古籍",
								"cat": 12
							},
							{
								"name": "历史",
								"key": "历史",
								"cat": 12
							},
							{
								"name": "政治/军事",
								"key": "政治/军事",
								"cat": 12
							},
							{
								"name": "哲学/宗教",
								"key": "哲学/宗教",
								"cat": 12
							},
						]
					},
					{
						"name": "生活",
						"foods": [{
								"name": "风水",
								"key": "风水",
								"cat": 5
							},
							{
								"name": "居家",
								"key": "居家",
								"cat": 5
							},
							{
								"name": "休闲",
								"key": "休闲",
								"cat": 5
							},
							{
								"name": "旅游",
								"key": "旅游",
								"cat": 5
							},
							{
								"name": "手工",
								"key": "手工",
								"cat": 5
							},
							{
								"name": "美食",
								"key": "美食",
								"cat": 5
							},
							{
								"name": "美妆",
								"key": "美妆",
								"cat": 5
							},
							{
								"name": "运动",
								"key": "运动",
								"cat": 5
							},
							{
								"name": "保健",
								"key": "保健",
								"cat": 5
							},
							{
								"name": "育儿",
								"key": "育儿",
								"cat": 5
							},
							{
								"name": "孕期",
								"key": "孕期",
								"cat": 5
							},
							{
								"name": "两性",
								"key": "两性",
								"cat": 5
							},
							{
								"name": "亲子/家教",
								"key": "亲子/家教",
								"cat": 5
							}
						]
					},
					{
						"name": "经管",
						"foods": [{
								"name": "投资管理",
								"key": "投资管理",
								"cat": 8
							},
							{
								"name": "管理",
								"key": "管理",
								"cat": 8
							},
							{
								"name": "经济",
								"key": "经济",
								"cat": 8
							},
						]
					},
					{
						"name": "科技",
						"foods": [{
								"name": "工业",
								"key": "工业",
								"cat": 2
							},
							{
								"name": "自然科学",
								"key": "自然科学",
								"cat": 2
							},
							{
								"name": "农林",
								"key": "农林",
								"cat": 2
							},
							{
								"name": "计算机",
								"key": "计算机",
								"cat": 2
							},
							{
								"name": "医学",
								"key": "医学",
								"cat": 2
							},
							{
								"name": "建筑",
								"key": "建筑",
								"cat": 2
							},
							{
								"name": "科普",
								"key": "科普",
								"cat": 2
							},
						]
					},
					{
						"name": "青春文学",
						"foods": [{
								"name": "影视写真",
								"key": "影视写真",
								"cat": 0
							},
							{
								"name": "校园",
								"key": "校园",
								"cat": 0
							},
							{
								"name": "古代言情",
								"key": "古代言情",
								"cat": 0
							},
							{
								"name": "爆笑/无厘头",
								"key": "爆笑/无厘头",
								"cat": 0
							},
							{
								"name": "娱乐/偶像",
								"key": "娱乐/偶像",
								"cat": 0
							},
							{
								"name": "穿越/重生/架空",
								"key": "穿越/重生/架空",
								"cat": 0
							},
							{
								"name": "叛逆/成长",
								"key": "叛逆/成长",
								"cat": 0
							},
							{
								"name": "爱情/情感",
								"key": "爱情/情感",
								"cat": 0
							},
						]
					},
					{
						"name": "小说",
						"foods": [{
								"name": "官场小说",
								"key": "官场小说",
								"cat": 11
							},
							{
								"name": "影视小说",
								"key": "影视小说",
								"cat": 11
							},
							{
								"name": "历史",
								"key": "历史",
								"cat": 11
							},
							{
								"name": "社会",
								"key": "社会",
								"cat": 11
							},
							{
								"name": "情感",
								"key": "情感",
								"cat": 11
							},
							{
								"name": "武侠",
								"key": "武侠",
								"cat": 11
							},
							{
								"name": "职场小说",
								"key": "职场小说",
								"cat": 11
							},
							{
								"name": "外国小说",
								"key": "外国小说",
								"cat": 11
							},
							{
								"name": "四大名著",
								"key": "四大名著",
								"cat": 11
							},
							{
								"name": "科幻小说",
								"key": "科幻小说",
								"cat": 11
							},
							{
								"name": "世界名著",
								"key": "世界名著",
								"cat": 11
							},
							{
								"name": "惊悚/恐怖",
								"key": "惊悚/恐怖",
								"cat": 11
							},
							{
								"name": "侦探/悬疑",
								"key": "侦探/悬疑",
								"cat": 11
							}
						]
					},
					{
						"name": "教育",
						"foods": [{
								"name": "工具书",
								"key": "工具书",
								"cat": 7
							},
							{
								"name": "考试",
								"key": "考试",
								"cat": 7
							},
							{
								"name": "外语",
								"key": "外语",
								"cat": 7
							},
							{
								"name": "教材",
								"key": "教材",
								"cat": 7
							},
							{
								"name": "中小学教辅",
								"key": "中小学教辅",
								"cat": 7
							},
						]
					},
				],
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器

			}
		},
		onLoad() {

		},
		onReady() {
			this.getMenuItemTop()
		},
		methods: {
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (this.timer) return;
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return;
						}
					}
				}, 10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item:last-child {
		min-height: 100vh;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
