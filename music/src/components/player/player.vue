﻿<template>
    <div class="player">
        <div class="normal-player" v-show="fullScreen">
            <div class="header">
                <div class="back">
                    <i class="icon-back"></i>
                </div>
                <div class="info">
                    <p>Fantastic Baby</p>
                    <p>BIGBANG (빅뱅)</p>
                </div>
            </div>
            <div class="cover">

            </div>
        </div>
        <div v-show="!fullScreen" class="mini-player">
            <div class="music-cover">
                <img :src="singer.singer_avatar" alt="">
            </div>
            <div class="intro">
                <span class="music-name">{{currentSong.song_name}}</span>
                <span class="music-author">{{singer.singer_name}}</span>
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
        props:{

        },
        mounted(){

        },
        computed:{
			...mapGetters([
				'singer',
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
    .player
        position fixed
        left 0
        z-index 1000
        background-color $color-highlight-background
        .normal-player
            position inherit
            top 0
            width 100%
            height 100%
            background-color inherit
        .mini-player
            position inherit
            bottom 0
            width 100%
            height 60px
            background-color inherit
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