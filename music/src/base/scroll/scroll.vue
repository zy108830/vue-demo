﻿<template>
    <div class="scroll">
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
				console.log(this.probeType)
				this.scroll = new BScroll('.scroll',{
					probeType:this.probeType
				})
				this.scroll.on('scroll', (pos) => {
					console.log(pos);
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