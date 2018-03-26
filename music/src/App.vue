<template>
    <div id="app"  @touchmove.prevent>
        <div class="header">
            <Header></Header>
            <Tab></Tab>
        </div>
        <div class="scroll-wrapper" ref="scroll_wrapper">
            <div class="content">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Header from 'components/header/header'
    import Tab from 'components/tab/tab'
    import BScroll from 'better-scroll'
	export default {
		name: 'App',
		data() {
			return {
                scroll:null
			}
		},
		created(){

		},
		mounted(){
            this.initScrollWrapperDom();
            setTimeout(()=>{
	            this.scroll=new BScroll('.scroll-wrapper',{
		            scrollX:false,
		            scrollY:true
	            })
            },20)
		},
		methods:{
            initScrollWrapperDom(){
                let scrollWrapperHeight=window.innerHeight-88;
                console.log(this.$refs,this.$refs.scroll_wrapper);
                this.$refs.scroll_wrapper.style.height=scrollWrapperHeight+'px';
            }
		},
        components:{
            Header,
            Tab
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .header
        position relative
        z-index 10
        background-color $color-background
    .scroll-wrapper
        position relative
        z-index 1
</style>
