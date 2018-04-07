﻿
<template>
    <transition name="singer-detail-trans">
        <div class="singer-detail">
            <div class="header">
                <div class="singer-avatar">
                    <img :src="singer.singer_avatar" alt="">
                </div>
                <div class="backdrop"></div>
                <div class="title">
                    <div @click="back" class="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="singer-name">{{singer.singer_name}}</h1>
                </div>
                <div class="play-random">
                    <i class="icon-play"></i> 随机播放全部
                </div>
            </div>
            <div class="main">
                <div class="bg-layer" ref="bg_layer"></div>
                <div class="song-list-wrapper" ref="song_list_wrapper">
                    <div class="song-list">
                        <ul>
                            <li class="song-item" v-for="song in song_list">
                                <h2 class="song-name">{{song.song_name}}</h2>
                                <p class="song-album">{{singer.singer_name}} · {{song.song_album}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import Song from 'common/js/song'
	import BScroll from 'better-scroll'

	export default {
		name: "SingerDetail",
		data() {
			return {
				song_list: [],
				scroll_origin_height: 0,
			}
		},
		created() {
			if (!this.singer.singer_mid) {
				this.$router.push({
					path: '/singer'
				})
				return
			}
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
				this.$router.push({
					path: '/singer'
				})
			},
			initSongListScroll() {
				this.scroll_origin_height = window.innerHeight * 0.6
				this.$refs.song_list_wrapper.style.height = this.scroll_origin_height + 'px'
				this.$refs.bg_layer.style.height = this.scroll_origin_height + 'px'
				this.scroll = new BScroll('.song-list-wrapper', {
					scrollY: true,
					scrollX: false,
					probeType: 3
				})
				this.scroll.on('scroll', () => {
					console.log(this.scroll.y)
					if (this.scroll.y < 0) {
						if(this.scroll_origin_height + Math.abs(this.scroll.y) < window.innerHeight - 42){
							this.$refs.bg_layer.style.height = this.scroll_origin_height+Math.abs(this.scroll.y) + 'px'
                        }else {
							// this.$refs.song_list_wrapper.style.overflow='hidden'
                        }
					}
				});
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
			song_list() {
				setTimeout(() => {
					if (!this.scroll) {
						return false
					}
					this.scroll.refresh();
				}, 20)
			}
		},
		computed: {
			...mapGetters([
				'singer'
			])
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
        z-index 100
        .header
            position relative
            height 40%
            overflow hidden
            .singer-avatar
                overflow hidden
                img
                    width 100%
            .backdrop
                position absolute
                z-index 101
                top 0
                left 0
                width 100%
                height 100%
                background-color black
                opacity 0.4
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
            .play-random
                z-index 102
                position fixed
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