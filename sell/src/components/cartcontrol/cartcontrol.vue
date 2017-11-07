<template>
    <div class="cartcontrol">
        <!--@click.stop.prevent阻止事件冒泡-->
        <div ref="addFoodToCart" class="cart-add" v-show="displayBuy(good.count)" @click.stop.prevent="addCart($event)"></div>
        <div class="cart-decrease" v-show="good.count>0" @click.stop.prevent="decreaseCart"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    import Tool from 'assets/js/tool'
    import App from 'assets/js/app'
    export default {
        props: {
            good: {
                type: Object
            }
        },
        methods: {
            displayBuy(count) {
                return !count;
            },
            addCart(event) {
                if(!event._constructed){
                    return false;
                }
                /**
                 * 禁用系统原生的事件
                 */
                if (!Tool.getArg('htid')) {
                    App.userLogin(location.href, true)
                    return;
                }
                this.$emit('add', event.target);
                if (this.good && !this.good.count) {
                    Vue.set(this.good, 'count', 1)
                }
                /**
                 * 事件派发
                 */
            },
            addCartApi(action) {
                if (!Tool.getArg('htid')) {
                    App.userLogin(location.href, true)
                    return
                }
                if(action===true){
                    Vue.set(this.good, 'count', 1)
                }else{
                    Vue.set(this.good, 'count', 0)
                }
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return false;
                }
                if (this.good.count) {
                    this.good.count--;
                }
            }
        },
        created() {
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size 0
        .cart-decrease
            display inline-block
            padding 6px
            transition all 0.5s linear
            opacity: 1
            transform: translate3d(0, 0, 0)
            background url("./xc_shopping_delete.png") no-repeat
            background-size 100% 100%
            width 30px
            height 30px
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)
                transition: all 0.4s linear
                transform: rotate(0)
            &.move-enter-active, &.move-leave-active
                transition: all 0.4s linear
            &.move-enter, &.move-leave-active
                opacity 0
                transform translate3d(24px, 0, 0)
                .inner
                    transform rotate(180deg)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147, 153, 159)
        .cart-add
            display inline-block
            padding 6px
            font-size 24px
            line-height 24px
            color rgb(0, 160, 220)
            background url("./xc_shopping_add.png") no-repeat
            background-size 100% 100%
            width 30px
            height 30px
</style>