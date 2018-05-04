﻿<template>
    <div class="better-scroll-wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'

	export default {
		props: {
			data: {
				type: Array,
				default: []
			},
			probeType:{
			    type:Number,
                default:0
            }
		},
		mounted() {
			setTimeout(() => {
				this.init()
			}, 20)
		},
		methods: {
			init(){
				///如果不用this.$refs.scroll的形式，而是用.scroll，就会导致组件在复用的时候gg
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType:this.probeType
				})
				this.scroll.on('scroll', (pos) => {
					this.$emit('scroll',pos);
				})
            },
			refresh() {
				setTimeout(() => {
					this.scroll.refresh();
				}, 20)
			}
		},
		watch: {
			data() {
				this.refresh();
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>