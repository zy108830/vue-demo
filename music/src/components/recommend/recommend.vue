﻿<template>
    <div class="recommend">
        <div class="scrollpic_list" ref="scrollpic_list">
            <img class="scrollpic" v-for="slider_single in slider" :src="slider_single['picUrl']" alt="">
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
				slider: []
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
	            this.slider = data['data']['slider']
	            this.$nextTick(() => {
	                this.setScrollpicDom()
                    this.initBScroll()
	            })
            },
			setScrollpicDom(){
				this.$refs.scrollpic_list.style.width='2070px';
			},
			initBScroll(){
				this.scroll = new BScroll('.recommend', {
					scrollX: true,
					scrollY: false
				});
            }
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .scrollpic_list
        display block
        .scrollpic
            display inline-block
            width 414px
</style>