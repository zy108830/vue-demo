<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <img class="shopcart-empty" :class="{'highlight':totalCount>0}" alt="">
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPriceDiscount}}<del>￥{{totalPrice}}</del><div class="coupon">优惠力度 <span class="discount">{{totalDiscount}}</span> 折，省￥{{saveMoney}}</div></div>
                </div>
                <div class="content-right" :class="{'content-right-disable':totalCount==0}" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="good in selectFoods">
                                <span class="name">{{good.desc}}</span>
                                <div class="price">
                                    <span>￥{{(good.price * good.count).toFixed(2)}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol @add="addFood" :good="good"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import cartcontrol from 'components/cartcontrol/cartcontrol'
    import BScroll from 'better-scroll'
    import Tool from 'assets/js/tool'
    import App from "../../assets/js/app";
    import { Indicator } from 'mint-ui';
    export default {
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return [
                        {
                            price: 30,
                            count: 1
                        }
                    ]
                }
            },
            'delivery-price': {
                type: Number,
                default: 0
            },
            'min-price': {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice() {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += (food.price * food.count) * 1000
                })
                return total / 1000
            },
            saveMoney() {
                //乘1000，是为了避免丢失精度
                return ((this.totalPrice * 1000 - this.totalPriceDiscount * 1000) / 1000).toFixed(2);
            },
            totalPriceDiscount() {
                return (((this.totalPrice) * 1000) * ((this.totalDiscount / 10) * 1000) / 1000000).toFixed(2);
            },
            totalDiscount() {
                var count = this.totalCount
                if (count <= 5) {
                    return 9
                } else if (count <= 10) {
                    return 8
                } else if (count <= 20) {
                    return 7
                } else {
                    return 6
                }
            },
            totalCount() {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDesc() {
                return '确认购买';
            },
            payClass() {
                if (this.totalPrice === 0) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        //避免重复初始化
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            })
                        } else {
                            this.scroll.refresh();
                        }
                    })
                }
                return show;
            }
        },
        methods: {
            drop(el) {
                /**
                 * 挑选一个隐藏的小球，绑定到某个商品中，如果用户点击购买这个商品，则触发动画
                 */
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        //show是可以触发vue动画机制 的
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        break;
                    }
                }
            },
            beforeDrop(el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        if(rect.x){
                            let x = rect.left - 32;
                            let y = -(window.innerHeight - rect.top - 22);
                            el.style.display = '';
                            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                            el.style.transform = `translate3d(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                            inner.style.transform = `translate3d(${x}px,0,0)`;
                        }
                    }
                }
            },
            dropping(el, done) {
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done);
                });
            },
            afterDrop(el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            getPayFuncIds() {
                var func_ids = [];
                this.selectFoods.forEach((good) => {
                    func_ids.push(good.id)
                })
                return JSON.stringify(func_ids);
            },
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
            },
            hideList() {
                this.fold = true;
            },
            pay() {
                if(this.totalPriceDiscount==0){
                    swal({
                        text: '购物车还是空的呢，先去买买买吧',
                        button: '我知道啦'
                    })
                    return false;
                }
                Indicator.open({
                    text:'',
                    spinnerType: 'fading-circle'
                });
                var api_root = Tool.getApiRoot();
                this.$http.post(api_root + '/web/v1/2017/1111/order', {
                        awarder_mac: Tool.getArg('awarder_mac') || 'aaa',
                        awarder_secure: Tool.getArg('awarder_secure') || 'a3055da975d8396c8631b2bb9edc716b',
                        platformid: Tool.getArg('platformid'),
                        htid: Tool.getArg('htid') || '83748179',
                        money: this.totalPriceDiscount,
                        func_ids: this.getPayFuncIds()
                    },
                    {
                        headers: {
                            platformid: "4",
                            packageid: "8",
                            sourceid: "43",
                            'mac-code': Tool.getArg('awarder_mac')
                        }
                    }).then((response) => {
                    response = response.body;
                    Indicator.close();
                    if (response.status == 1) {
                        App.pay(JSON.stringify(response.data.pay_para));
                    } else {
                        swal({
                            text: response.msg,
                            button: '我知道啦'
                        })
                    }
                });
            },
            addFood(target) {
                this.drop(target);
            }
        },
        components: {
            cartcontrol
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 47px
        background #000
        .content
            display flex
            background #141d27
            font-size 0
            background-color rgb(83, 71, 221)
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #5448dd
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        text-align center
                        background url("./xc_shopping_cart_-empty.png") no-repeat
                        background-size 100% 100%
                        &.highlight
                            background url("./xc_shopping_cart.png") no-repeat
                            background-size 100% 100%
                        .shopcart-empty
                            line-height 44px
                            font-size 24px
                            color #80858a
                            &.highlight
                                color #fff
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #fff
                        background rgb(240, 20, 20)
                        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display inline-block
                    vertical-align top
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    font-size 17px
                    font-weight 700
                    color: #fff
                    del
                        color #BDB8F1
                    &.highlight
                        color: #fff
                    .coupon
                        font-size 11px
                        color #fad921
                        .discount
                            display: inline-block;
                            background-color: #fad922;
                            width: 12px;
                            height: 12px;
                            line-height: 12px;
                            text-align: center;
                            color: #25248c;

                .desc
                    display: inline-block
                    vertical-align: top
                    margin: 12px 0 0 12px
                    line-height: 24px
                    font-size: 10px

            .content-right
                flex 0 0 126px
                width 126px
                &.content-right-disable
                    opacity 0.2
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 17px
                    font-weight 700
                    &.not-enough
                        background rgb(234, 33, 158)
                        color #fff
                    &.enough
                        background rgb(234, 33, 158)
                        color #fff

        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 200
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: #493FD8
                    transition: all 0.4s linear
        .shopcart-list
            position absolute
            top 0
            left 0
            z-index -1
            width 100%
            background #212281
            transform: translate3d(0, -100%, 0)
            &.fold-enter-active, &.fold-leave-active
                transition all 0.5s
            &.fold-enter, &.fold-leave-active
                transform translate3d(0, 0, 0)
            .list-header
                height 40px
                line-height 40px
                padding 0 18px
                border-bottom 1px solid rgba(7, 17, 27, 0.1)
                .title
                    float left
                    font-size 14px
                    color #463DD2
                .empty
                    float right
                    font-size 12px
                    color #463DD2
            .list-content
                padding 0 18px
                max-height 217px
                overflow hidden
                .food
                    position relative
                    padding 12px 0
                    box-sizing border-box
                    border-1px(rgba(7, 17, 27, 0.1))
                    background #212281
                    .name
                        line-height 24px
                        font-size 14px
                        color #fff
                    .price
                        position absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-size 14px
                        font-weight 700
                        color #FED700
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 6px

    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index 40
        backdrop-filter blur(10px)
        opacity: 1
        background: rgba(7, 17, 27, 0.6)
        &.fade-enter-active, &.fade-leave-active
            transition all 0.5s
        &.fade-enter, &.fade-leave-active
            opacity 0
            background rgba(7, 17, 27, 0)

    @media (max-width: 330px)
        .shopcart .content .content-left .price
            font-size 12px
        .shopcart .content .content-left .price .coupon
            font-size 7px
        .shopcart .shopcart-list .list-content .food .name
            font-size 11px
</style>