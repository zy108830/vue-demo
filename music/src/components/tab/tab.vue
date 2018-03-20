﻿<template>
    <div class="tab">
        <div class="tab-item">
            <router-link tag="span" to="/recommend">推荐</router-link>
        </div>
        <div class="tab-item">
            <router-link tag="span" to="/singer">歌手</router-link>
        </div>
        <div class="tab-item">
            <router-link tag="span" to="/rank">排行</router-link>
        </div>
        <div class="tab-item">
            <router-link tag="span" to="/search">搜索</router-link>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
	export default {
        name:"Tab"
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .tab
        display flex
        height 44px
        line-height 44px
        text-align center
        .tab-item
            flex 1 0 auto
            color $color-text-l
            .router-link-active
                color $color-theme
                border-bottom 2px solid $color-theme
</style>