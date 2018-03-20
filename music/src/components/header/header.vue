<template>
    <div class="header">
        <div class="logo"></div>
        <span class="title">Chicken Music</span>
    </div>
</template>
<script type="text/ecmascript-6">
	export default {
		name: "Header",
        data(){
            return {

            }
        }
	}
</script>
<style ﻿scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable';
    @import "~common/stylus/mixin";
    .header
        text-align center
        height 44px
        .logo
            display inline-block
            width 30px
            height 32px
            margin 6px 9px
            bg-image("./logo")
            background-repeat no-repeat
            background-size 100% auto
        .title
            display inline-block
            vertical-align top
            line-height 44px
            font-size 18px
            color $color-theme
</style>
