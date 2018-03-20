﻿<template>
    <div class="recommend">
        推荐
    </div>
</template>
<script type="text/ecmascript-6">
    import getRecommend from 'api/recommend'
	export default {
		name: "Recommend",
        created(){
            getRecommend().then((data)=>{
                console.log(data)
            },(err)=>{
                console.log(err)
            })
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>