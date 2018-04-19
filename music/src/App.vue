<template>
    <div id="app" @touchmove.prevent>
        <div class="app-header">
            <Header></Header>
            <Tab></Tab>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script type="text/ecmascript-6">
	import Header from 'components/header/header'
	import Tab from 'components/tab/tab'
	export default {
		name: 'App',
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {

		},
		components: {
			Header,
			Tab
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    #app
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color $color-background
</style>
