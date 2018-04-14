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
			}
		},
		mounted() {
			setTimeout(() => {
				this.scroll = new BScroll('.scroll')
			}, 20)
		},
		methods: {
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