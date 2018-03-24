﻿<template>
    <div class="recommend">
        <Scrollpic></Scrollpic>
    </div>
</template>
<script type="text/ecmascript-6">
    import Scrollpic from 'base/scrollpic/scrollpic'
    import {getDiscList} from 'api/recommend'
    export default {
        name:"Recommend",
        data(){
        	return {

            }
        },
        created(){
        	getDiscList().then(function (data) {
                console.log(data.data);
	        },(err)=>{
                console.log('error...');
            })
        },
        components:{
        	Scrollpic
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>