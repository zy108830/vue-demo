<!--App.vue这种.vue为后缀的文件,表示单文件组件,文件名即表示组件名-->
<template>
    <div>
        <v-header :seller="seller"></v-header>
        <!--真正在手机上实现1px的效果-->
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>
<script type="text/ecmascript-6">
    import header from './components/header/header.vue'
    import {urlParse} from 'common/js/util'

    const ERR_OK = 0;
    //必须在引入Hello模块之后，在components属性中注册，否则无法在 template 中使用
    //在es6中，如果对象的key与value一样，则可以只写一个key
    export default {
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        return queryParam.id;
                    })()
                }
            }
        },
        beforeCreate(){
            console.warn('vue beforeCreate')
        },
        created() {
            console.warn('vue created');
            this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = Object.assign({}, this.seller, response.data);
                }
            });
        },
        beforeMount(){
            console.warn('vue beforeMount');
        },
        mounted(){
            console.warn('vue mounted');
        },
        beforeUpdate(){
            console.warn('vue beforeUpdate');
        },
        updated(){
            console.warn('vue updated');
        },
        activated(){
            console.warn('vue activated');
        },
        deactivated(){
            console.warn('vue deactivated');
        },
        beforeDestroy(){
            console.warn('vue beforeDestroy');
        },
        destroyed(){
            console.warn('vue destroyed');
        },
        errorCaptured(){
            console.warn('vue errorCaptured');
        },
        components: {
            'v-header': header
        }
    }
</script>
<!--flex布局详见：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool-->
<!--vue-loader里面的postcss会帮助我们自动抹平浏览器的兼容问题，例如flex-->
<style lang="stylus" rel="stylesheet/stylus">
    @import "common/stylus/mixin.styl"
    .tab
        display flex
        width 100%
        height 40px
        line-height 40px
        /*rgba中的最后一个参数表示的是透明度*/
        /*border-bottom 1px solid*/
        /*真正在手机上实现1px的效果*/
        border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            flex 1
            text-align center
            & > a
                display block
                font-size 14px
                color rgb(77, 85, 93)
</style>
