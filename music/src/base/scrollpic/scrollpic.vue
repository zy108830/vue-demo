﻿
<template>
    <div class="scrollpic_list_wrapper">
        <div class="scrollpic_list" ref="scrollpic_list">
            <img v-for="scrollpic in scrollpic_data" class="scrollpic" @click="dealScrollpicLink(scrollpic['linkUrl'])"  :src="scrollpic['picUrl']" alt="">
        </div>
        <p>{{activeTimers}}</p>
        <div v-if="display_pointer" class="pointer_list_wrapper">
            <div class="pointer_list">
                <div v-for="scrollpic,index in scrollpic_data" class="pointer">
                    <span :class="{selected:index==getCurrentPage}"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
	import {getRecommend} from 'api/recommend'
	import BScroll from 'better-scroll'

	export default {
		name: "Scrollpic",
		props: {
			loop: {
				type: Boolean,
				default: true
			},
            autoPlay:{
				type:Boolean,
                default:true
            },
			interval:{
				type:Number,
                default:2000
            }
		},
		created() {
			this.requestRecommendApi();
			window.sc=this;

			window.originalSetTimeout=window.setTimeout;
			window.originalClearTimeout=window.clearTimeout;
			this.activeTimers=0;
			window.setTimeout=(func,delay)=> {
				this.activeTimers++;
				return window.originalSetTimeout(func,delay);
			};
			window.clearTimeout=timerID=>{
				this.activeTimers--;
				window.originalClearTimeout(timerID);
			};
		},
		data() {
			return {
				scrollpic_data: [],
				scroll: null,
				activeTimers:0,
				display_pointer: false
			}
		},
		mounted() {

		},
		watch: {
			scrollpic_data: function (newValue, oldValue) {

			}
		},
		computed: {
			getCurrentPage() {
				if (!this.scroll) {
					return -1
				}
				let currentPage = this.scroll.getCurrentPage().pageX;
				if (currentPage == this.scrollpic_data.length) {
					return 0;
				}
				return currentPage;
			}
		},
		methods: {
			dealScrollpicLink(linkUrl) {
				window.location.href = linkUrl;
			},
			requestRecommendApi() {
				getRecommend().then((data) => {
					this.scrollpic_data = data['data']['slider']
					this.$nextTick(() => {
						this.setScrollpicDom()
						this.initBScroll()
                        if(this.autoPlay){
	                        this.startScroll()
                        }
					})

				}, (err) => {
					console.log(err)
				})
			},
			setScrollpicDom(isResieze) {
				//先设置轮播图的宽度
				let scrollpic_list_wrapper = document.getElementsByClassName('scrollpic_list_wrapper')[0];
				let scrollpic_list_wrapper_width = scrollpic_list_wrapper.clientWidth;
				// console.log('scrollpic_list_wrapper_width',scrollpic_list_wrapper_width);
				let scrollpic_list = document.getElementsByClassName('scrollpic_list')[0].children;
				for (let i = 0; i < scrollpic_list.length; i++) {
					scrollpic_list[i].style.width = scrollpic_list_wrapper_width + 'px';
				}
				//再设置轮播图父节点的大小=单个轮播图的宽度*轮播图的数量
				let scrollpic_list_width = scrollpic_list_wrapper_width * scrollpic_list.length;
				if (!isResieze && this.loop) {
					//根据无缝循环轮播的原理，需要再加两张轮播图的宽度
					scrollpic_list_width += 2 * scrollpic_list_wrapper_width;
					// console.log(scrollpic_list_wrapper_width,scrollpic_list.length,this.$refs.scrollpic_list.style.width,scrollpic_list_width);
				}

				this.$refs.scrollpic_list.style.width = scrollpic_list_width + 'px';
			},
			initBScroll() {
				this.scroll = new BScroll('.scrollpic_list_wrapper', {
					scrollX: true,//允许水平滚动
					scrollY: false,//禁止垂直滚动
					momentum: false,//当快速滑动的时候，是否开启滑动惯性
					snap: true,//是否为slider组件
					snapLoop: true,//是否无缝循环轮播
					snapThreshold: 0.1,//轮播图滑动的阈值，超过这个阈值即可滑动到下一页
					snapSpeed: 400//轮播图切换的动画时间
				});
				this.scroll.on('scrollEnd', () => {
					if(this.timer){
						//避免自动滚动+手动滚动，叠加多个滚动任务
						clearTimeout(this.timer)
					}
					if(this.autoPlay){
					    this.startScroll();
                    }
				});
				this.scroll.on('beforeScrollStart', () => {
					if(this.timer){
						//避免自动滚动+手动滚动，叠加多个滚动任务
						clearTimeout(this.timer)
					}
				});
				window.addEventListener('resize', () => {
					setTimeout(() => {
						this.setScrollpicDom(true);
					}, 20);
				})
			},
			startScroll() {
				this.pageIndex = (this.scroll.getCurrentPage().pageX + 1) % 7;
                this.timer = setTimeout(() => {
                    this.scroll.goToPage(this.pageIndex, 0, 400)
                }, this.interval)
            }
        },
        destroyed() {
			console.log("触发destroyed事件");
			clearTimeout(this.timer);
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .recommend
        .scrollpic_list_wrapper
            overflow hidden
            position relative
            .scrollpic_list
                .scrollpic
                    width auto
            .pointer_list_wrapper
                position absolute
                left 50%
                bottom 10px
                width 140px
                .pointer_list
                    position relative
                    left -50%
                    display flex
                    .pointer
                        flex 1 0 auto
                        text-align center
                        span
                            display inline-block
                            width 8px
                            height 8px
                            border-radius 4px
                            background-color hsla(0, 0%, 100%, .5)
                        span.selected
                            width 20px
</style>