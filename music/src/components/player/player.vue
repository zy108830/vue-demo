﻿<template>
    <div class="player">
        <div class="normal-player">

        </div>
        <div class="mini-player">
            <div class="music-cover">
                <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002JsU5q10jUBt.jpg?max_age=2592000" alt="">
            </div>
            <div class="intro">
                <span class="music-name">我的梦</span>
                <span class="music-author">张靓颖</span>
            </div>
            <div class="music-control music-play">
                <i class="icon-mini icon-play-mini"></i>
            </div>
            <div class="music-control music-menu">
                <i class="icon-playlist"></i>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Mock from 'mockjs'
    import {mapGetters} from 'vuex'
	export default {
		name:"Player",
        mounted(){

        },
        computed:{
			...mapGetters([
				'playing',
				'fullScreen',
				'playlist',
				'sequenceList',
				'mode',
				'currentIndex',
                'currentSong'
            ])
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    $icon-size=32px
    .mini-player
        position fixed
        left 0
        bottom 0
        width 100%
        height 60px
        background-color $color-highlight-background
        display flex
        align-items center
        .music-cover
            flex 0 0 50px
            padding-left 20px
            img
                width 40px
                height 40px
        .intro
            flex 1 0 auto
            display flex
            flex-direction column
            .music-name
                line-height 20px
                font-size 14px
                color $color-text
            .music-author
                font-size 12px
                line-height 20px
                color $color-text-d
        .music-control
            flex 0 0 30px
            padding 0 10px
            i
                font-size  $icon-size
                color $color-theme-d
</style>