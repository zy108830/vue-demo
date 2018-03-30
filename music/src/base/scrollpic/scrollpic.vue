﻿
<template>
    <div class="scrollpic_list_wrapper">
        <div class="scrollpic_list" ref="scrollpic_list">
            <slot></slot>
        </div>
        <div class="pointer_list_wrapper" v-if="display_pointer">
            <div class="pointer_list">
                <div v-for="value,key in pointer_list" class="pointer">
                    <span :class="{selected:key==dotIndex}"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	export default {
		name: "Scrollpic",
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			autoPlay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 2000
			},
			display_pointer:{
				type:Boolean,
                default:false
            }
		},
		created() {

		},
		data() {
			return {
				dotIndex: 0,
				pointer_list:[]
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.setScrollpicDom()
				this.initBScroll()
				if (this.autoPlay) {
					this.startScroll()
				}
			})
		},
		watch: {

		},
		computed: {},
		methods: {
			setPointerCount(count){
                this.pointer_list=new Array(count);
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
				if(!this.pointer_list.length){
					this.setPointerCount(scrollpic_list.length);
                }
			},
			scrollEnd() {
				this.dotIndex = this.scroll.getCurrentPage().pageX;
				if (this.loop) {
					this.dotIndex -= 1;
				}
				if (this.autoPlay) {
					this.startScroll();
				}
			},
			initBScroll() {
				this.scroll = new BScroll('.scrollpic_list_wrapper', {
					scrollX: true,//允许水平滚动
					scrollY: false,//禁止垂直滚动
					momentum: false,//当快速滑动的时候，是否开启滑动惯性
					snap: true,//是否为srollpic组件
					snapLoop: this.loop,//是否无缝循环轮播
					snapThreshold: 0.1,//轮播图滑动的阈值，超过这个阈值即可滑动到下一页
					snapSpeed: 400//轮播图切换的动画时间
				});
				this.scroll.on('scrollEnd', this.scrollEnd);
				this.scroll.on('beforeScrollStart', () => {
					//仅在用户手动滚动时触发
					if (this.autoPlay) {
						clearTimeout(this.timer)
					}
				});
				window.addEventListener('resize', () => {
					//避免resize产生大量的定时任务，出现性能问题
					clearTimeout(this.resizeTimer);
					this.resizeTimer = setTimeout(() => {
						//﻿window.resize比较快速的时候，会导致自动轮播失效
						//针对BScroll框架本身的bug修复，实际并未完全修复。。。
						if (this.scroll.isInTransition) {
							this.scrollEnd();
						} else {
							if (this.autoPlay) {
								this.startScroll();
							}
						}
						this.setScrollpicDom(true);
						this.scroll.refresh();
					}, 60);
				})
			},
			startScroll() {
				let nextPage = this.dotIndex + 1;
				if (this.loop) {
					nextPage += 1;
				}
				//如果不clear一下，在iPhone6S plus上测试会自动滚动异常
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.scroll.goToPage(nextPage, 0, 400)
				}, this.interval)
			}
		},
		activated() {
			//路由跳转，从其他组件切换回此组件
			if (this.autoPlay) {
				this.startScroll();
			}
		},
		deactivated() {
			//路由跳转，切换到其他组件
			clearTimeout(this.timer);
		},
		beforeDestroy() {
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
                a
                    display inline-block
                    img
                        width 100%
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