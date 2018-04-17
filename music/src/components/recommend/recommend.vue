﻿﻿<template>
    <div class="recommend" ref="recommend">
        <Scroll ref="scroll" class="recommend-content" :data="disc_list">
            <div>
                <div class="scrollpic-module" v-if="scrollpic_data.length">
                    <Scrollpic>
                        <a v-for="scrollpic in scrollpic_data" :href="scrollpic['linkUrl']">
                            <img @load="scrollpic_load" class="scrollpic" :src="scrollpic['picUrl']" alt="">
                        </a>
                    </Scrollpic>
                </div>
                <div class="disc-module">
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
            </div>
            <div v-show="!disc_list.length" class="loading-module">
                <Loading></Loading>
            </div>
        </Scroll>
    </div>
</template>
<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
	import Scrollpic from 'base/scrollpic/scrollpic'
	import Loading from 'base/loading/loading'
	import {getDiscList,getRecommend} from 'api/recommend'
	export default {
		name: "Recommend",
        props:{

        },
		data() {
			return {
				disc_list:[],
				scrollpic_data:[]
            }
		},
		created() {
			this.requestRecommendApi();
			this.requestDiscApi();
		},
        mounted(){

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
                this.$refs.scroll.refresh();
            }
        },
        watch:{

        },
		components: {
			Scroll,
			Scrollpic,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .recommend
        position fixed
        top 88px
        width 100%
        bottom 0
        .recommend-content
            height 100%
            overflow hidden
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
                                flex 0 0 70px
                                padding-right 20px
                                img
                                    vertical-align top
                                    width 100%
                                    height auto
                            .disc-info
                                display flex
                                flex-direction column
                                flex 1 1 auto
                                font-size 14px
                                line-height 20px
                                justify-content center
                                .disc-author
                                    margin-bottom 10px
                                    /*margin-bottom 10px*/
                                .disc-name
                                    color $color-text-l
            .loading-module
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
</style>