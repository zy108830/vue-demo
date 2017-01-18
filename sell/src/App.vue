<!--App.vue这种.vue为后缀的文件,表示单文件组件,文件名即表示组件名-->
<template>
    <div>
        <v-header></v-header>
        <div class="tab">
            <div class="tab-item">
                <a v-link="{path:'/goods'}">商品</a>
            </div>
            <div class="tab-item">
                <a v-link="{path:'/ratings'}">评论</a>
            </div>
            <div class="tab-item">
                <a v-link="{path:'/seller'}">商家</a>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import header from './components/header/header.vue'
  //必须在引入Hello模块之后，在components属性中注册，否则无法在 template 中使用
  //在es6中，如果对象的key与value一样，则可以只写一个key
  export default {
    components: {
      'v-header': header
    }
  }

</script>
<!--flex布局详见：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool-->
<!--vue-loader里面的postcss会帮助我们自动抹平浏览器的兼容问题，例如flex-->
<style lang="stylus" rel="stylesheet/stylus">
    .tab
        display flex
        width 100%
        height 40px
        line-height 40px
        .tab-item
            flex 1
            text-align center
            & > a
                display block
                font-size 14px
                color rgb(77,85,93)

</style>
