﻿﻿<template>
    <div class="recommend" ref="recommend">
        <div ref="recommend_content">
            <Scrollpic></Scrollpic>
            <div class="disc-module">
                <h1 class="disc-header">热门歌单推荐</h1>
                <div class="disc-main">
                    <div class="disc-list">
                        <div v-for="disc in disc_list" class="disc">
                            <div class="disc-cover">
                                <img :src="disc.imgurl" alt="">
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
    </div>
</template>
<script type="text/ecmascript-6">
	import Scrollpic from 'base/scrollpic/scrollpic'
	import {getDiscList} from 'api/recommend'
	import BScroll from 'better-scroll'

	export default {
		name: "Recommend",
        props:{

        },
		data() {
			return {
				disc_list:[]
            }
		},
		created() {
			getDiscList().then((resp) => {
				const resp_content = resp['data'];
				this.disc_list = resp_content['data']['list']
                setTimeout(()=>{
	                this.initScrollWrapperDom();
                },5000)
			}, (err) => {
				console.log('error...');
			})
		},
        mounted(){

        },
        methods:{
	        initScrollWrapperDom() {
	        	let recommend_height=window.innerHeight-88;
	        	console.log('recommend_height',recommend_height);
		        document.getElementsByClassName('recommend')[0].style.height=recommend_height+'px';
		        this.scroll = new BScroll('.recommend', {
			        scrollX: false,
			        scrollY: true
		        })
	        }
        },
        watch:{

        },
		components: {
			Scrollpic
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .recommend
        position relative
        top 88px
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
                                width 60px
                                height 60px
                                height auto
                        .disc-info
                            flex 1 0 auto
                            font-size 14px
                            line-height 30px
                            .disc-author
                                /*margin-bottom 10px*/
                            .disc-name
                                color $color-text-l
</style>