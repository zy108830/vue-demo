﻿<template>
    <transition name="singer-detail-trans">
        <div class="singer-detail">
            <div class="header" ref="header" :class="{'header-scroll-down':scroll_down,'header-scroll-top':scroll_to_top}">
                <div ref="headerscale" class="headerscale">
                    <ImgBackdrop ref="imgBackdrop" :blur="blur" :url="avatar" :percent="75"></ImgBackdrop>
                    <div v-show="song_list.length && !scroll_to_top" class="play-random">
                        <i class="icon-play"></i> 随机播放全部
                    </div>
                </div>
                <div class="title">
                    <div v-show="singer" @click="back" class="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="singer-name">{{singer.singer_name}}</h1>
                </div>
            </div>
            <div class="main" ref="song_list_container">
                <div class="bg-layer" ref="bg_layer"></div>
                <Scroll class="scroll" :class="{'scroll-to-top':scroll_to_top}" @scroll="scrollListener" :data="song_list" :probeType="3">
                    <div class="song-list">
                        <ul>
                            <li class="song-item" @click="playMusic(song_list,index)" v-for="song,index in song_list">
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
	import {mapGetters,mapActions} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import Song from 'common/js/song'
	import Loading from 'base/loading/loading'
	import Scroll from 'base/scroll/scroll'
	import ImgBackdrop from 'base/img/ImgBackdrop'
	import {selectPlay} from "../../store/actions";

	const title_height = 42
	export default {
		name: "SingerDetail",
		data() {
			return {
				song_list: [],
				scroll_origin_height: 0,
				scroll_to_top: false,
				scroll_down: false,
				avatar: '',
				scrollY: 0,
				scrollYPositive: 0,
				blur:0
			}
		},
		created() {
			if (!this.singer.singer_mid) {
				this.back();
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
			}, 200)
		},
		methods: {
			back() {
				this.$router.back();
			},
            playMusic(song_list,index){
                this.selectPlay({
                    list:song_list,
                    index
                })
            },
            ...mapActions([
            	'selectPlay'
            ]),
			displayAvatarBackdrop() {
				this.blur = this.scrollYPositive * 0.05
			},
			zoomInAvatar() {
				let multiple = this.scrollYPositive / this.header_origin_height;
				this.$refs.headerscale.style.transform = `scale(${1 + multiple})`
			},
			scrollUp() {
				let scroll_new_height = this.scroll_origin_height + this.scrollYPositive;
				if (scroll_new_height < window.innerHeight - title_height) {
					this.displayAvatarBackdrop();
					this.scroll_to_top = false
					this.$refs.bg_layer.style.height = this.scroll_origin_height + this.scrollYPositive + 'px'
				} else {
					this.scroll_to_top = true
				}
				this.scroll_down = false
			},
			scrollDown() {
				this.scroll_down = true;
				this.zoomInAvatar();
			},
			scrollListener(pos) {
				this.scrollY = pos.y;
				this.scrollYPositive = Math.abs(this.scrollY)
				if (this.scrollY <= 0) {
					this.scrollUp();
				} else {
					this.scrollDown();
				}
			},
			initSongListScroll() {
				this.avatar = this.singer.singer_avatar
                this.header_origin_height= this.$refs.header.clientHeight
				this.scroll_origin_height = window.innerHeight - this.header_origin_height
				this.$refs.song_list_container.style.height = this.scroll_origin_height + 'px'
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
		watch: {},
		computed: {
			...mapGetters([
				'singer'
			])
		},
		components: {
			Loading,
			Scroll,
			ImgBackdrop
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
        z-index 100
        top 0
        left 0
        width 100%
        height 100%
        background-color $color-background
        .header
            position relative
            &.header-scroll-down
                overflow initial
                z-index 300
            &.header-scroll-top
                z-index 200
                height 42px
                overflow hidden
            .headerscale
                transform-origin top
            .backdrop-scrolling
                -webkit-backdrop-filter blur(0px)
                opacity: 1
                background-color rgba(0, 0, 0, 0.4)
                &.backdrop-up
                    z-index 106
                    height 44px
                &.backdrop-scroll-down
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
            .play-random
                position absolute
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
                &.play-random-hide
                    display none
                &.play-scroll-down
                    z-index 106
                .icon-play
                    margin-right 5px
        .main
            position fixed
            z-index 150
            left 0
            bottom 0
            width 100%
            .bg-layer
                position absolute
                left 0
                bottom 0
                width 100%
                background-color $color-background
            .scroll
                height 100%
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
                .loading-wrapper
                    position absolute
                    top 50%
                    left 50%
                    transform translate(-50%, -50%)
</style>