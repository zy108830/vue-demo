﻿
<template>
    <div ref="avatar" class="img-backdrop">
        <div ref="backdrop" class="backdrop"></div>
    </div>
</template>
<script type="text/ecmascript-6">
	export default {
		name: "ImgBackdrop",
		props: {
			url: {
				type: String,
				default: ''
			},
			percent: {
				type: Number,
				default: 100
			}
		},
		data() {
			return {}
		},
		mounted() {
			this.$refs.avatar.style['background-image'] = `url(${this.url})`;
			this.$refs.avatar.style['padding-top'] = this.percent / 100 * 100 + '%';
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .img-backdrop
        position relative
        width 100%
        height 0
        background-repeat no-repeat
        background-size cover
        .backdrop
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background-color black
            opacity 0.4
</style>