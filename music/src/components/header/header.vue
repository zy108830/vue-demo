<template>
  <div class="header">
      <p><img class="logo" alt="">Chicken Music</p>
  </div>
</template>
<script>
	export default {
		name: "header"
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import "~common/stylus/mixin"
  header
    p
      text-align center
      color red
</style>