﻿<template>
    <div class="scrollpic_list_wrapper">
        <div class="scrollpic_list" ref="scrollpic_list">
            <img v-for="scrollpic in scrollpic_data" class="scrollpic" @click="dealScrollpicLink(scrollpic['linkUrl'])" :src="scrollpic['picUrl']" alt="">
        </div>
        <div v-if="display_pointer" class="pointer_list_wrapper">
            <div class="pointer_list">
                <div v-for="scrollpic,index in scrollpic_data" class="pointer">
                    <span :class="{selected:index==getScrollpicCurrentPage}"></span>
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
		created() {
			this.requestRecommendApi();
		},
		data() {
			return {
				scrollpic_data: [],
				scroll:null,
				display_pointer:false
			}
		},
		mounted() {
			//避免图片还未加载完成就出现pointer
			window.addEventListener('resize',()=>{
                setTimeout(()=>{
	                this.setScrollpicDom();
				    this.scroll.refresh();
                },20);
			})
		},
		computed:{
			getScrollpicCurrentPage(){
				if(!this.scroll){
					return -1
				}
				let currentPage=this.scroll.getCurrentPage().pageX;
				if(currentPage==5){
					return 0;
                }
                return currentPage;
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
                setTimeout(()=>{
	                this.setScrollpicDom()
	                this.initBScroll()
	                this.autoPlay()
	                this.display_pointer=true
                },20)
			},
			setScrollpicDom(isResieze){
				//先设置轮播图的宽度
				let scrollpic_list_wrapper=document.getElementsByClassName('scrollpic_list_wrapper')[0];
				let scrollpic_list_wrapper_width=scrollpic_list_wrapper.clientWidth;
				let scrollpic_list=document.getElementsByClassName('scrollpic_list')[0].children;
				for (let i=0;i<scrollpic_list.length;i++){
					scrollpic_list[i].style.width=scrollpic_list_wrapper_width+'px';
				}
				//再设置轮播图父节点的大小=单个轮播图的宽度*轮播图的数量
                let scrollpic_list_width=scrollpic_list_wrapper_width*scrollpic_list.length;
				if(!isResieze){
					//根据无缝循环轮播的原理，需要再加两张轮播图的宽度

					scrollpic_list_width+=2*scrollpic_list_wrapper_width;
					// console.log(scrollpic_list_wrapper_width,scrollpic_list.length,this.$refs.scrollpic_list.style.width,scrollpic_list_width);
                }
                this.$refs.scrollpic_list.style.width=scrollpic_list_width+'px';
			},
			initBScroll(){
				this.scroll = new BScroll('.scrollpic_list_wrapper', {
					scrollX: true,//允许水平滚动
					scrollY: false,//禁止垂直滚动
					momentum: false,
					snap: true,//开启轮播
					snapLoop: true,//循环轮播
					snapThreshold: 0.3,
					snapSpeed: 400
				});
				this.scroll.on('scrollEnd',()=>{
                    this.autoPlay();
				});
				this.scroll.on('beforeScrollStart', () => {
					//避免叠加多个滚动任务
                    clearTimeout(this.timer)
				});
			},
			autoPlay() {
				this.pageIndex=(this.scroll.getCurrentPage().pageX+1)%7;
                this.timer=setTimeout(() => {
					this.scroll.goToPage(this.pageIndex, 0, 400)
				}, 2000)
			}
		},
        destroyed(){
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
                            background-color hsla(0,0%,100%,.5)
                        span.selected
                            width 20px
</style>