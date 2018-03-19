<template>
  <div id="app">
    Hello World
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'common/stylus/variable'
    #app
        color $color-theme
</style>
