<template>
    <div>
        <div class="goods">
            <!--左侧菜单-->
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in goods_group" class="menu-item" :class="{'current':currentIndex===index}"
                        @click="selectMenu(index,$event)">
                        <span class="text border-1px">
                            {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <!--右侧菜-->
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="group in goods_group" class="food-list food-list-hook">
                        <h1 class="title">{{group.name}}</h1>
                        <ul v-if="group.goods">
                            <li v-for="good in group.goods" class="food-item border-1px">
                                <div class="content">
                                    <h2 class="name">{{good.desc}} <span v-if="good.share_request_count>0" class="label-star">*</span>
                                    </h2>
                                    <div class="price">
                                        <span class="now">￥{{formatPrice(good.price)}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol v-if="displayBuy(good.id)" ref="cartcontrol" @add="addFood" :good="good"></cartcontrol>
                                        <div v-if="!displayBuy(good.id)">
                                            <img class="have_buy" src="./xc_shopping_have.png" alt=""></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-if="group.rules" class="rules">
                            <div class="rules-price">
                                <p>1.优惠说明</p>
                                <table>
                                    <tr v-for="rule in group.rules">
                                        <td class="price-count">{{rule.count}}</td>
                                        <td>{{rule.coupon}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="rules-content">
                                <p>2. 活动时间：即日起 - 2017年11月20日；</p>
                                <p>3. 优惠力度以每次购买个数为准，购买历史不重复叠加，建议需要购买的用户一次性选购所需功能，获取最大优惠；</p>
                                <p>4. 已购买功能不能重复购买，购买成功后，请到 “我的” - “系统消息”，查看成功购买记录；</p>
                                <p>5. 功能右上角带 <span class="label-star">*</span>，代表该功能支持邀请好友解锁，邀请好友详细规则详见功能解锁说明；</p>
                                <p>6. 心潮科技对本活动拥有最终解释权。</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--全选-->
            <div class="select-all" :class="{'select-all-enable':select_all_enable}" @click="selectAll"></div>
            <!--底部购物车-->
            <shopcart ref="shopcart" :selectFoods="selectFoods"></shopcart>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol'
    import food from 'components/food/food'
    import Tool from 'assets/js/tool'
    import App from 'assets/js/app'
    import {Indicator} from 'mint-ui';

    var Xinchao = {};
    Xinchao.Web = {};
    Xinchao.Web.payCallback = function (status) {
        if (status == 1) {
            paySuccess();
        } else {
            payFailure();
        }
    };
    window.Xinchao = Xinchao;

    function paySuccess() {
        setTimeout(function () {
            swal({
                title: "支付成功!",
                text: "可随时在 【系统通知】 中查看购买记录!",
                button: "好的"
            });
        }, 1000);
    }

    function payFailure() {
        setTimeout(function () {
            swal({
                title: '支付失败',
                button: '好的'
            });
        }, 1000);
    }

    const ERR_OK = 0;
    var api_root = Tool.getApiRoot();
    export default {
        data() {
            return {
                seller: {},
                goods_group: [],
                goodsInShopcart: [],
                listHeight: [],
                scrollY: 0,
                user_func: {
                    payFuncIdList: []
                }
            }
        },
        created() {
            this.$http.get(api_root + '/web/v1/2017/1111', {
                params: {
                    awarder_mac: Tool.getArg('awarder_mac'),
                    awarder_secure: Tool.getArg('awarder_secure'),
                    platformid: Tool.getArg('platformid'),
                    htid: Tool.getArg('htid')
                }
            }).then((response) => {
                response = response.body;
                this.seller = Object.assign({}, this.seller, response.data)
                this.goods_group = this.seller.group;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                })
            });
            this.queryUserFunc()
        },
        computed: {
            currentIndex() {
                let $index = 0;
                if (!this.listHeight.length) {
                    return $index;
                }
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (this.scrollY >= height1 && this.scrollY < height2) {
                        $index = i;
                        break;
                    }
                }
                return $index;
            },
            select_all_enable() {
                return this.user_have_count + this.goodsInShopcart.length == 47;
            },
            user_have_count() {
                var count = 0;
                this.goods_group.forEach((group) => {
                    if (group.goods) {
                        group.goods.forEach((good) => {
                            if (!this.displayBuy(good.id)) {
                                count++
                            }
                        })
                    }
                })
                return count;
            },
            selectFoods() {
                let goods = [];
                this.goods_group.forEach((group) => {
                    if (group.goods) {
                        group.goods.forEach((good) => {
                            if (good.count) {
                                goods.push(good)
                            }
                        })
                    }
                })
                this.goodsInShopcart = goods;
                return goods;
            }
        },
        methods: {
            queryUserFunc(){
                this.$http.get(api_root + '/web/v1/user/payFunc', {
                    params: {
                        awarder_mac: Tool.getArg('awarder_mac'),
                        awarder_secure: Tool.getArg('awarder_secure'),
                        platformid: Tool.getArg('platformid'),
                        htid: Tool.getArg('htid')
                    }
                }).then((response) => {
                    response = response.body;
                    if(response.status==1){
                        this.user_func = response.data;
                    }
                    Indicator.close();
                });
            },
            displayBuy(id) {
                var display=true;
                for (var i=0;i<this.user_func.payFuncIdList.length;i++){
                    if(parseInt(this.user_func.payFuncIdList[i])===parseInt(id)){
                        display=false;
                        break;
                    }
                }
                return display
            },
            selectAll() {
                if (!Tool.getArg('htid')) {
                    App.userLogin(window.location.href.replace('#/','').replace(/&random=\d+/,'')+'&random='+Math.round(Math.random()*1000))
                    return
                }
                var components = this.$refs.cartcontrol,
                    selectAllAction = this.goodsInShopcart.length + this.user_have_count === 47 ? false : true;
                for (var i = 0; i < components.length; i++) {
                    components[i].addCartApi(selectAllAction);
                }
            },
            _initScroll() {
                /**
                 * 如果不设置click: true，BScroll默认会禁用click事件
                 */
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3,
                    click: true
                })
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
                let height = 0;
                this.listHeight.push(height)
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height)
                }
            },
            selectMenu(index, event) {
                if (!event._constructed) {
                    return false
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
                let el = foodList[index]
                let animate_time = 300;
                this.foodsScroll.scrollToElement(el, animate_time)
            },
            addFood(target) {
                this._drop(target);
            },
            _drop(target) {
                /**
                 * 使用this.$refs.shopcart访问子组件
                 * 使用nextTick来优化动画性能
                 */
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target)
                });
            },
            formatPrice(price) {
                try {
                    return Number(price).toFixed(2);
                } catch (e) {
                    console.log('出错', price);
                }
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display flex
        /*高度固定，使用BScroll进行滚动*/
        position absolute
        top 146px
        bottom 46px
        overflow hidden
        /*end*/
        width 100%
        .label-star
            color gold
        .menu-wrapper
            flex 0 0 104px
            width 104px
            background-color rgb(67, 60, 193)
            .menu-item
                display table
                height 43px
                width 80px
                line-height 14px
                padding 0 12px
                border-bottom 1px solid rgba(255, 255, 255, 0.1)
                &.current
                    position relative
                    z-index 10
                    margin-top -1px
                    background rgb(83, 71, 221)
                    font-size 700
                    .text
                        opacity 1
                        color #fff
                        border-none()
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 2px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.special
                        bg-image('special_3')
                    &.guarantee
                        bg-image('decrease_3')
                    &.invoice
                        bg-image('decrease_3')
                .text
                    display table-cell
                    width 56px
                    color #fff
                    opacity 0.5
                    vertical-align middle
                    font-size 12px
                    border-1px(rgba(7, 17, 27, 0.1))
        .foods-wrapper
            flex 1
            background-color rgb(37, 37, 140)
            .title
                padding-left 14px
                height 22px
                line-height 22px
                border-left 2px solid #5e77bf
                font-size 12px
                color #fff
                background-color rgb(83, 71, 221)
            .food-item
                display flex
                margin 17px
                border-1px(rgb(54, 50, 171))
                &:last-child
                    border-none()
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    height 60px
                    .name
                        margin 2px 0 8px 0
                        height 14px
                        line-height 14px
                        font-size 15px
                        color #fff
                    .price
                        font-weight 700
                        line-height 24px
                        margin-right 8px
                        font-size 15px
                        color #fad921
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 12px
                        .have_buy
                            height 25px
                            width auto
            .rules
                padding 17px 17px 17px 17px
                color white
                .rules-content,.rules-price
                    p
                        font-size 12px
                        margin-bottom 13px
                        letter-spacing 1.5px
                        line-height 20px
                .rules-content
                    margin-bottom 35px
                .rules-price
                    table
                        width 100%
                        font-size 12px
                        margin-bottom 13px
                        tr
                            height 30px
                            line-height 30px
                        td
                            text-align center
                            border 1px solid #ccc
                            &.price-count
                                text-align left
                                text-indent 10px
        .select-all
            position fixed
            bottom 10%
            right 0
            width 80px
            height 45px
            background url("./xc_shopping_all_add_default.png") no-repeat
            background-size 100% 100%
            margin-bottom 20px
        .select-all-enable
            background url("./xc_shopping_all_add_selected.png") no-repeat
            background-size 100% 100%
    @media(max-width: 330px)
        .goods .foods-wrapper .food-item .content .name
            font-size 13px
        .cartcontrol .cart-decrease,.cartcontrol .cart-add
            position relative
            top 3px
            width 20px !important
            height 20px !important
        .goods .foods-wrapper .food-item .content .cartcontrol-wrapper .have_buy
            height 20px
            width auto
        .shopcart .content .content-left .price
            font-size 10px
</style>