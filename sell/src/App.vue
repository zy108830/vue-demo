<template>
    <div>
        <v-header ref="header" :seller="seller"></v-header>
        <!--<keep-alive>-->
        <goods ref="goods" :seller="seller"></goods>
        <!--</keep-alive>-->
        <input type="hidden" name="xinchao_share" :value="getXinchaoShare()">
    </div>
</template>
<script type="text/ecmascript-6">
    import header from './components/header/header.vue'
    import goods from './components/goods/goods.vue'
    import {urlParse} from 'common/js/util'
    import Tool from 'assets/js/tool'
    import Weixin from 'assets/js/weixin'
    import App from 'assets/js/app'
    import Baidu from 'assets/js/baidu'
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
                buttons: ['马上体验','好的'],
                dangerMode: true
            }).then((willDelete) => {
                if (willDelete) {
                    window.location.href=window.location.href.replace('#/','').replace(/&random=\d+/,'')+'&random='+Math.round(Math.random()*1000);
                } else {
                    App.redirect(3011, true);
                }
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
    export default {
        data() {
            return {
                seller: {
                    activity: {
                        bulletin: '单次购买≥21个享6折优惠，11个≤单次购买≤20个享7折优惠，6个≤单次购买≤10个享8折优惠，单次购买≤5个享9折优惠',
                        cover: 'https://res.psy-1.com/xc_title.png'
                    }
                },
                payFunc: {},
                shareContent: {
                    appMsg: {
                        title: '妈蛋！等这么久总算搞到一次称心优惠',
                        desc: '小手一抖，优惠到手',
                        link: 'https://www.psy-1.com/',
                        imgUrl: 'https://webres.psy-1.com/images/common/photo.png'
                    },
                    timeline: {
                        title: '妈蛋！等这么久总算搞到一次称心优惠',
                        link: 'https://www.psy-1.com/',
                        imgUrl: 'https://webres.psy-1.com/images/common/photo.png'
                    }
                }
            }
        },
        created() {
            Indicator.open({
                text: '加载中',
                spinnerType: 'fading-circle'
            });
            var api_root = Tool.getApiRoot();
            var shareContent = this.shareContent;
            var weixin = new Weixin();
            weixin.configReady(function () {
                weixin.setShareContent(shareContent);
            });
            Baidu.statics()
        },
        methods: {
            getXinchaoShare() {
                return Weixin.getShareContentDom(this.shareContent);
            }
        },
        components: {
            'v-header': header,
            goods
        }
    }
</script>
<!--flex布局详见：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool-->
<!--vue-loader里面的postcss会帮助我们自动抹平浏览器的兼容问题，例如flex-->
<style lang="stylus" rel="stylesheet/stylus">
    @import "common/stylus/mixin.styl"

    .swal-modal
        width: 80%;
        text-align: left;
        .swal-title
            font-family: "Tahoma,Helvetica,Arial,宋体,sans-serif"
            font-size: 20px
        .swal-text
            max-width none
        .swal-button--danger
            background-color: #7cd1f9;
        .swal-button
            &:focus
                box-shadow: none
</style>
