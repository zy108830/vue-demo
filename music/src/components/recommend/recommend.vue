﻿﻿<template>
    <div class="recommend" ref="recommend">
        <div class="recommend-scroll-wrapper">
            <div>
                <div class="scrollpic-module" v-if="scrollpic_data.length">
                    <Scrollpic :display_pointer="display_pointer">
                        <a v-for="scrollpic in scrollpic_data" :href="scrollpic['linkUrl']">
                            <img @load="scrollpic_load" class="scrollpic" :src="scrollpic['picUrl']" alt="">
                        </a>
                    </Scrollpic>
                </div>
                <div v-if="disc_list.length" class="disc-module">
                    <h1 class="disc-header">热门歌单推荐</h1>
                    <div class="disc-main">
                        <div class="disc-list">
                            <div v-for="disc in disc_list" class="disc">
                                <div class="disc-cover">
                                    <img v-lazy="disc.imgurl" alt="">
                                </div>
                                <div class="disc-info">
                                    <p class="disc-author">
                                        {{disc.creator.name}}
                                    </p>
                                    <p class="disc-name">
                                        {{disc.dissname}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div v-if="!disc_list.length" class="loading-module">-->
                    <!--<Loading></Loading>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
	import Scrollpic from 'base/scrollpic/scrollpic'
	import Loading from 'base/loading/loading'
	import {getDiscList,getRecommend} from 'api/recommend'
	import BScroll from 'better-scroll'

	export default {
		name: "Recommend",
        props:{

        },
		data() {
			return {
				disc_list:[],
				scrollpic_data:[],
				display_pointer:false
            }
		},
		created() {
			this.requestRecommendApi();
			this.requestDiscApi();
		},
        mounted(){
            this.initScrollWrapperDom();
        },
        methods:{
	        requestRecommendApi() {
		        getRecommend().then((data) => {
			        this.scrollpic_data = data['data']['slider']
		        })
	        },
	        requestDiscApi(){
		        getDiscList().then((resp) => {
			        const resp_content = resp['data'];
			        this.disc_list = resp_content['data']['list']
		        })
            },
	        scrollpic_load(){
	        	if(!this.scrollpic_load_complete){
			        setTimeout(()=>{
				        this.scroll.refresh();
				        this.display_pointer=true;
			        },100)
                    this.scrollpic_load_complete=true
                }
            },
	        initScrollWrapperDom() {
	        	let recommend_height=window.innerHeight-88;
		        document.getElementsByClassName('recommend-scroll-wrapper')[0].style.height=recommend_height+'px';
		        this.scroll = new BScroll('.recommend-scroll-wrapper', {
			        scrollX: false,
			        scrollY: true
		        })
	        }
        },
        watch:{
	        disc_list(newValue,oldValue){
	        	setTimeout(()=>{
                    this.scroll.refresh();
                },100)
            }
        },
		components: {
			Scrollpic,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .recommend
        position relative
        top 88px
        .recommend-scroll-wrapper
            .disc-module
                .disc-header
                    text-align center
                    height 65px
                    line-height 65px
                    color $color-theme
                    font-size 14px
                .disc-main
                    .disc-list
                        .disc
                            display flex
                            padding 0 20px 20px 20px
                            .disc-cover
                                flex 0 0 80px
                                padding-right 20px
                                img
                                    vertical-align top
                                    width 60px
                                    height 60px
                            .disc-info
                                display flex
                                flex-direction column
                                flex 1 0 auto
                                font-size 14px
                                line-height 30px
                                .disc-author
                                    /*margin-bottom 10px*/
                                .disc-name
                                    color $color-text-l
            .loading-module
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
</style>