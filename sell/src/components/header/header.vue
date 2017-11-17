<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img style="opacity: 0" width="64" height="64" :src="seller.activity.cover" alt="">
            </div>
            <div class="content"></div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <marquee class="bulletin-text" direction="left" scrollamount="3">{{seller.activity.bulletin}}</marquee>
        </div>
        <div class="background">
            <img :src="seller.activity.cover" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item,index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from 'components/star/star'

    export default {
        /**
         * 使用props获取父组件传递的数据
         */
        props: {
            seller: {
                type: Object
            }
        },
        /**
         * 使用data获取当前组件本身的数据
         */
        data() {
            return {
                detailShow: false
            }
        },
        methods: {
            showDetail: function () {
                this.detailShow = true;
            },
            hideDetail: function () {
                this.detailShow = false
            }
        },
        created() {
            this.classMap = [
                'decrease',
                'discount',
                'special',
                'invoice',
                'guarantee'
            ]
//            setInterval(() => {
//                if (this.seller.bulletin) {
//                    this.seller.bulletin = this.seller.bulletin.slice(1) + this.seller.bulletin.substr(0, 1);
//                }
//            }, 300)
        },
        components: {
            star
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        color #fff
        position relative
        height 146px
        .content-wrapper
            padding 24px 12px 18px 24px
            /*可以消除字体的默认margin,不然文字与图片间会有边距*/
            font-size 0
            position relative
            .avatar
                display inline-block
                img
                    border-radius 2px
            .content
                display inline-block
                vertical-align top
                margin-left 16px
                .title
                    margin 2px 0 8px 0
                    .brand
                        display inline-block
                        vertical-align top
                        width 30px
                        height 18px
                        bg-image('brand')
                        background-size 30px 18px
                        background-repeat no-repeat
                    .name
                        margin-left 6px
                        font-size 16px
                        line-height 18px
                        font-weight bold
                .description
                    margin-bottom 10px;
                    line-height 12px;
                    font-size 12px;
                .support
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        margin-right 4px
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.special
                            bg-image('special_1')
                        &.guarantee
                            bg-image('decrease_1')
                        &.invoice
                            bg-image('decrease_1')
                    .text
                        line-height 12px
                        font-size 12px
                        vertical-align top

            .support-count
                position absolute
                right 12px
                bottom 18px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background: rgba(0, 0, 0, 0.2)
                text-align center
                .count
                    font-size 10px
                .icon-keyboard_arrow_right
                    font-size 10px
                    line-height 24px
                    margin-left 2px

        .bulletin-wrapper
            height 28px
            line-height 28px
            padding 0 12px 0 12px
            white-space nowrap
            overflow hidden
            position relative
            background url("./xc_roll_explain.png") no-repeat
            background-size 100% 100%
            top 12px
            .bulletin-title
                display inline-block
                width 22px
                height 12px
                background-image url("./xc_roll_yh.png")
                background-size 22px 12px
                background-repeat no-repeat
            .bulletin-text
                color #5e77bf;
                vertical-align top
                margin 0 4px
                font-size 10px
                display: inline-block;
                overflow: hidden;
                width 87%;
        .background
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            z-index -1
        .detail
            position fixed
            top 0
            left 0
            z-index 100
            width 100%
            height 100%
            overflow auto
            /*目前只有iphone支持，弹窗的时候，将背景层进行模糊虚化*/
            backdrop-filter: blur(10px)
            -webkit-backdrop-filter: blur(10px)
            opacity: 1
            background: rgba(7, 17, 27, 0.8)
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.5s
            &.fade-enter, &.fade-leave-active
                opacity 0
                background rgba(7, 17, 27, 0)
            .detail-wrapper
                min-height 100%
                width 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px
                    .name
                        line-height 16px
                        text-align center
                        font-size 16px
                        font-weight 700
                    .star-wrapper
                        margin-top 18px
                        padding 2px 0
                        text-align center
                    .title
                        display flex
                        width 80%
                        margin 28px auto 24px auto
                        .line
                            flex 1
                            position relative
                            top -6px
                            border-bottom 1px solid rgba(255, 255, 255, 0.2)
                        .text
                            padding 0 12px
                            font-weight 700
                            font-size 14px
                    .supports
                        width 80%
                        margin 0 auto
                        .support-item
                            padding 0 12px
                            margin-bottom 12px
                            font-size 0
                            &:last-child
                                margin-bottom 0
                            .icon
                                display inline-block
                                width 16px
                                height 16px
                                vertical-align top
                                margin-right 6px
                                background-size 16px 16px
                                background-repeat no-repeat
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.special
                                    bg-image('special_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                            .text
                                line-height 16px
                                font-size 12px
                    .bulletin
                        width 80%
                        margin 0 auto
                        .content
                            padding 0 12px
                            line-height 24px
                            font-size 12px
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto
                clear both
                font-size 32px
</style>
