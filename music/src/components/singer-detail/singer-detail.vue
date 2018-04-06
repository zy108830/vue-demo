﻿<template>
    <transition name="singer-detail-trans">
        <div class="singer-detail">
            453895738495734898573898
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from 'api/singer'
	export default {
        name:"SingerDetail",
        created(){
            if(!this.singer.singer_mid){
                this.$router.push({
                    path:'/singer'
                })
                return
            }
        	getSingerDetail(this.singer.singer_mid).then((data)=>{
                console.log(data)
        	})
        },
        computed:{
            ...mapGetters([
                'singer'
            ])
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .singer-detail-trans-enter-active,.singer-detail-trans-leave-active
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
        z-index 110
        /*position fixed*/
        /*background-color red*/
        /*z-index 10*/
</style>