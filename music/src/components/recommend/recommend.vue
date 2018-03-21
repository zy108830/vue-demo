﻿<template>
    <div class="recommend">
        <div class="scrollpic_list_wrapper">
            <div class="scrollpic_list" ref="scrollpic_list">
                <img class="scrollpic" v-for="scrollpic in scrollpic_data" :src="scrollpic['picUrl']" alt="">
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
                scrollpic_data: []
			}
		},
		mounted() {
		},
		methods: {
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
				this.$refs.scrollpic_list.style.width='1875px';
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
            },
            autoPlay() {
                let pageIndexY=0
                let animationTime=400
                setInterval(() => {
                    let pageIndexX = (this.scroll.getCurrentPage().pageX + 1)% 5
                    this.scroll.goToPage(pageIndexX, pageIndexY, animationTime)
                }, 1000)
            }
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .recommend
        .scrollpic_list_wrapper
            overflow scroll
            .scrollpic_list
                .scrollpic
                    width 375px
</style>