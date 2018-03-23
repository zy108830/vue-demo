<template>
    <div id="app">
        <Header></Header>
        <Tab></Tab>
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
        components:{
            Header,
            Tab
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
