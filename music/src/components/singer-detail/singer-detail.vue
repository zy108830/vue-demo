﻿<template>
    <transition name="singer-detail-trans">
        <div class="singer-detail">
            <div class="header" :class="{'header-scroll-down':scroll_down}">
                <div class="title" :class="{'title-up':scroll_fixed,'title-scroll-down':scroll_down}">
                    <div v-show="singer" @click="back" class="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="singer-name">{{singer.singer_name}}</h1>
                </div>
                <div class="singer-avatar" ref="singer_avatar" :class="{'singer-avatar-up':scroll_fixed,'singer-avatar-scroll-down':scroll_down}">
                    <img :src="singer.singer_avatar" alt="">
                    <div ref="backdrop" class="backdrop" :class="{'backdrop-up':scroll_fixed,'backdrop-scroll-down':scroll_down,'backdrop-scrolling':backdrop_scrolling}"></div>
                    <div v-show="song_list.length" class="play-random" :class="{'play-random-up':scroll_fixed,'play-scroll-down':scroll_down}">
                        <i class="icon-play"></i> 随机播放全部
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="bg-layer" ref="bg_layer"></div>
                <Scroll @scroll="scrollListener" :data="song_list" class="song-list-wrapper" :probeType="3" ref="song_list_wrapper">
                    <div class="song-list">
                        <ul>
                            <li class="song-item" v-for="song in song_list">
                                <h2 class="song-name">{{song.song_name}}</h2>
                                <p class="song-album">{{singer.singer_name}} · {{song.song_album}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="loading-wrapper">
                        <Loading v-show="!song_list.length"></Loading>
                    </div>
                </Scroll>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import Song from 'common/js/song'
	import BScroll from 'better-scroll'
    import Loading from 'base/loading/loading'
    import Scroll from 'base/scroll/scroll'

	export default {
		name: "SingerDetail",
		data() {
			return {
				song_list: [],
				scroll_origin_height: 0,
				scroll_fixed:false,
				scroll_down:false,
				backdrop_scrolling:false
			}
		},
		created() {
			if (!this.singer.singer_mid) {
				this.$router.push({
					path: '/singer'
				})
				return
			}
			this.scrollY=0;
			getSingerDetail(this.singer.singer_mid).then((data) => {
				this.normalizeSingerDetailData(data);
			})
			window.singer_detail = this;
		},
		mounted() {
			setTimeout(() => {
				this.initSongListScroll();
			}, 20)
		},
		methods: {
			back() {
			    this.$router.back();
			},
			scrollListener(pos){
				this.scrollY=pos.y;
				if (this.scrollY <= 0) {
					//上拉
					if(this.scroll_origin_height + Math.abs(this.scrollY) < window.innerHeight - 42){
						this.scroll_fixed=false
						this.$refs.bg_layer.style.height = this.scroll_origin_height+Math.abs(this.scrollY) + 'px'
						this.backdrop_scrolling=true;
						let blur=Math.abs(this.scrollY)*0.05+'px'
						this.$refs.backdrop.style['-webkit-backdrop-filter']=`blur(${blur})`
					}else {
						this.scroll_fixed=true
						this.backdrop_scrolling=false;
						// this.$refs.song_list_wrapper.style.overflow='hidden'
					}
					this.$refs.singer_avatar.style.transform=`scale(1)`
					this.scroll_down=false
				}else{
					//下拉
					this.backdrop_scrolling=false;
					let multiple=this.scrollY/this.scroll_origin_height;
					this.$refs.singer_avatar.style.transform=`scale(${1+multiple})`
					this.scroll_down=true;
				}
            },
			initSongListScroll() {
				this.scroll_origin_height = window.innerHeight * 0.6
				this.$refs.song_list_wrapper.style.height = this.scroll_origin_height + 'px'
				this.$refs.bg_layer.style.height = this.scroll_origin_height + 'px'
			},
			normalizeSingerDetailData(data) {
				for (let i = 0; i < data['data']['list'].length; i++) {
					let song = data['data']['list'][i];
					this.song_list.push(new Song({
						song_mid: song['musicData']['songmid'],
						song_name: song['musicData']['songname'],
						song_album: song['musicData']['albumname']
					}))
				}
			}
		},
		watch: {

		},
		computed: {
			...mapGetters([
				'singer'
			])
		},
        components:{
	        Loading,
	        Scroll
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .singer-detail-trans-enter-active, .singer-detail-trans-leave-active
        transition all .5s ease

    .singer-detail-trans-enter, .singer-detail-trans-leave-to
        transform: translateX(100%);
        opacity: 0;

    .singer-detail
        position fixed
        background-color $color-background
        top 0
        left 0
        width 100%
        height 100%
        .header
            width 100%
            height 0
            padding-top 75%
            .singer-avatar
                height 100%
                overflow hidden
                img
                    width 100%
            .singer-avatar-scroll-down
                position absolute
                width 100%
                height 100%
                z-index 104
                transform-origin top
            .singer-avatar-up
                z-index: 105;
                position: absolute;
                width: 100%;
                height: 44px;
            .backdrop
                position absolute
                z-index 101
                top 0
                left 0
                width 100%
                height 100%
                background-color black
                opacity 0.4
            .backdrop-scrolling
                -webkit-backdrop-filter blur(0px)
                opacity: 1
                background-color rgba(0,0,0,0.4)
            .backdrop-up
                z-index 106
                height 44px
            .backdrop-scroll-down
                z-index 105
            .title
                position fixed
                top 0
                z-index 102
                width 100%
                .back
                    position fixed
                    padding 10px
                    font-size 0
                    color $color-theme
                    .icon-back
                        font-size 22px
                .singer-name
                    height 42px
                    line-height 42px
                    text-align center
                    font-size 18px
            .title-up
                z-index: 107
            .title-scroll-down
                z-index: 106
            .play-random
                position absolute
                z-index 102
                left 50%
                transform translate(-50%)
                bottom 30px
                width 135px
                height 32px
                border-radius 16px
                border 2px solid $color-theme
                color $color-theme
                text-align center
                line-height 32px
                font-size 12px
                .icon-play
                    margin-right 5px
            .play-random-up
                display none
            .play-scroll-down
                z-index 106
        .header-scroll-down
            overflow initial
        .main
            .bg-layer
                position absolute
                left 0
                bottom 0
                z-index 103
                width 100%
                height 400px
                background-color $color-background
            .song-list-wrapper
                /*overflow hidden*/
                position absolute
                z-index 104
                width 100%
                .loading-wrapper
                    position absolute
                    top 50%
                    left 50%
                    transform translate(-50%,-50%)
            .song-list
                padding 20px 30px
                .song-item
                    padding 10px 0
                    .song-name
                        line-height 20px
                        height 20px
                        font-size 14px
                    .song-album
                        line-height 20px
                        height 20px
                        font-size 14px
                        color $color-text-d
</style>