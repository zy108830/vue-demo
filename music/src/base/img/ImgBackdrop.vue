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
			},
			blur: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		mounted() {
			this.$refs.avatar.style['padding-top'] = this.percent / 100 * 100 + '%';
		},
		watch:{
		    url(){
			    this.$refs.avatar.style['background-image'] = `url(${this.url})`;
            },
            blur(){
	            this.$refs.backdrop.style['-webkit-backdrop-filter'] = `blur(${this.blur}px)`
            }
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
            background-color rgba(0,0,0,0.5)
</style>