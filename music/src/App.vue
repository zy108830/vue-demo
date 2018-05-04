<template>
    <div id="app" @touchmove.prevent>
        <div class="app-header">
            <Header></Header>
            <Tab></Tab>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <Player></Player>
    </div>
</template>
<script type="text/ecmascript-6">
	import Header from 'components/header/header'
	import Tab from 'components/tab/tab'
	import Player from 'components/player/player'
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
			Tab,
            Player
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    #app
        background-color $color-background
</style>
