<template>
    <div class="singer">
        <div class="singer-list-wrapper" ref="singer_list_wrapper">
            <ul class="singer-group-list">
                <li class="singer-group" v-for="singer_group,singer_index in this.singer_list_map">
                    <h2 class="singer-group-title">{{singer_index}}</h2>
                    <ul class="singer-list">
                        <li v-for="singer in singer_group" class="singer-item">
                            <a class="singer-link" :href="getSingerLink(singer.Fsinger_mid)">
                                <div class="singer-avatar">
                                    <img :src="getSingerAvatar(singer.Fsinger_mid)" alt="">
                                </div>
                                <div class="singer-name">
                                    <p>{{singer.Fsinger_name}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getSingerList} from "api/singer";
    import BScroll from 'better-scroll'
    export default {
		name: "Singer",
        data(){
		    return {
		    	singer_list:[],
                singer_list_hot:[],
                singer_list_keys:[]
            }
        },
        created(){
			window.singer=this;
            getSingerList().then((data)=>{
            	this.singer_list=data['data']['list']
            })
        },
        mounted(){
		    setTimeout(()=>{
		    	this.initSingListScroll();
            },20)
        },
        computed:{
			singer_list_map(){
				let map={},map_sort={},hot_singer=[];
				//建立歌手首字母与歌手列表group之间的映射
				for (let i=0;i<this.singer_list.length;i++){
					let singer=this.singer_list[i];
					if(i<10){
						hot_singer.push(singer)
                    }
					let charCode=singer.Findex.charCodeAt();
					if(charCode>=65 && charCode<=90){
						if(!(singer.Findex in map)){
							map[singer.Findex]=[];
							this.singer_list_keys.push(singer.Findex);
						}
						map[singer.Findex].push(singer)
                    }
                }
                //按照首字母对歌手列表group进行排序，并添加热门歌手数据
                this.singer_list_keys=Object.keys(map).sort();
				this.singer_list_keys.unshift('热门');
				map['热门']=hot_singer;
                this.singer_list_keys.forEach((value,index)=>{
                    map_sort[value]=map[value]
                })
                //添加热门歌手数据
                return map_sort;
            }
        },
        methods:{
	        initSingListScroll(){
	        	this.$refs.singer_list_wrapper.style.height=window.innerHeight-88+'px'
	            this.scroll=new BScroll('.singer-list-wrapper',{
                    scrollX:false,
                    scrollY:true
                })
            },
			getSingerAvatar(singer_mid){
				return `//y.gtimg.cn/music/photo_new/T001R150x150M000${singer_mid}.jpg?max_age=2592000`
            },
            getSingerLink(singer_mid){
	            return `https://y.qq.com/n/yqq/singer/${singer_mid}.html#stat=y_new.singerlist.singerpic`
            }
        },
        watch:{
	        singer_list_map(){
	        	setTimeout(()=>{
	        	    this.scroll.refresh();
                },100)
            }
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .singer
        position relative
        top 88px
        .singer-group
            padding-bottom 30px
        .singer-group-title
            display block
            background-color $color-highlight-background
            color $color-text-l
            line-height 30px
            padding-left 20px
        .singer-link
            display flex
            padding 20px 0 0 30px
            .singer-avatar
                img
                    width 50px
                    height 50px
                    border-radius 25px
                    vertical-align top
            .singer-name
                font-size 14px
                line-height 50px
                margin-left 20px
</style>