<!--App.vue这种.vue为后缀的文件,表示单文件组件,文件名即表示组件名-->
<template>
  <v-header></v-header>
  <div class="tab">
    I am tab
  </div>
  <div class="content">
    I am content
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
<style lang="stylus" rel="stylesheet/stylus">
</style>
