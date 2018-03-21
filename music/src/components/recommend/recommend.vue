﻿<template>
    <div class="recommend">
        <div class="scrollpic_list_wrapper">
            <div class="scrollpic_list" ref="scrollpic_list">
                <img v-for="scrollpic in scrollpic_data" class="scrollpic" @click="dealScrollpicLink(scrollpic['linkUrl'])" :src="scrollpic['picUrl']" alt="">
            </div>
            <div class="pointer_list_wrapper">
                <div class="pointer_list">
                    <div v-for="scrollpic,index in scrollpic_data" class="pointer">
                        <span :class="{selected:index==getScrollpicCurrentPage}"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
	import getRecommend from 'api/recommend'
	import BScroll from 'better-scroll'

	export default {
		name: "Recommend",
		created() {
			this.requestRecommendApi();
		},
		data() {
			return {
                scrollpic_data: [],
                scroll:null,
                scroll_lock_wait:false
			}
		},
		mounted() {

		},
        computed:{
	        getScrollpicCurrentPage(){
		        if(!this.scroll){
			        return -1
		        }
		        return this.scroll.getCurrentPage().pageX;
	        }
        },
		methods: {
			dealScrollpicLink(linkUrl){
                window.location.href=linkUrl;
            },
			requestRecommendApi() {
				getRecommend().then((data) => {
					this.getRecommendDataSuccess(data)
				}, (err) => {
					console.log(err)
				})
			},
            getRecommendDataSuccess(data){
	            this.scrollpic_data = data['data']['slider']
	            this.$nextTick(() => {
	                this.setScrollpicDom()
                    this.initBScroll()
                    this.autoPlay()
	            })
            },
			setScrollpicDom(){
				//先设置轮播图的宽度
				let scrollpic_list_wrapper=document.getElementsByClassName('scrollpic_list_wrapper')[0];
				let scrollpic_list_wrapper_width=scrollpic_list_wrapper.clientWidth;
				let scrollpic_list=document.getElementsByClassName('scrollpic_list')[0].children;
				for (let i=0;i<scrollpic_list.length;i++){
					scrollpic_list[i].style.width=scrollpic_list_wrapper_width+'px';
                }
                //再设置轮播图父节点的大小=单个轮播图的宽度*轮播图的数量
				this.$refs.scrollpic_list.style.width=scrollpic_list_wrapper_width*scrollpic_list.length+'px';
			},
            initBScroll(){
                this.scroll = new BScroll('.scrollpic_list_wrapper', {
                    scrollX: true,//允许水平滚动
                    scrollY: false,//禁止垂直滚动
                    momentum: false,
                    snap: {
                        loop: false,
                        threshold: 0.3,
                        speed: 400
                    }
                });
                //每一次滑动结束的事件
                this.scroll.on('scrollEnd',()=>{
                	// console.log('滚动结束');
                	if(!this.scroll_lock_wait){
                        this.autoPlay();
                    }
                });
                this.scroll.on('touchEnd',()=>{
	                // console.log('触摸结束');
                	clearTimeout(this.timer);
                	if(!this.scroll_lock_wait){
		                this.scroll_lock_wait=true;
		                setTimeout(()=>{
			                this.scroll_lock_wait=false;
			                this.autoPlay();
		                },4000)
                    }
                })
            },
            autoPlay() {
                let pageIndexY=0
                let animationTime=400
                this.timer=setTimeout(() => {
                    let pageIndexX = (this.getScrollpicCurrentPage + 1)% 5
                    this.scroll.goToPage(pageIndexX, pageIndexY, animationTime)
                }, 1500)
            }
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
                            background-color hsla(0,0%,100%,.5)
                        span.selected
                            width 20px
</style>