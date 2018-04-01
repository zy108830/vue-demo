<template>
    <div class="singer">
        <div class="singer-list-wrapper" ref="singer_list_wrapper">
            <ul class="singer-group-list" v-show="singer_list.length>1">
                <li class="singer-group" v-for="singer_group,singer_index in singer_list_map">
                    <h2 class="singer-group-title">{{singer_index}}</h2>
                    <ul class="singer-list">
                        <li v-for="singer in singer_group" class="singer-item">
                            <a class="singer-link" :href="singer.getSingerLink()">
                                <div class="singer-avatar">
                                    <img v-lazy="singer.getSingerAvatar()" alt="">
                                </div>
                                <div class="singer-name">
                                    <p>{{singer.getSingerName()}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="singer-index-nav">
                <ul>
                    <li @click="selectSingerGroup" :data-index="index" :class="{active:index==singer_group_index_current}" v-for="value,index in singer_list_keys">
                        {{value.substr(0,1)}}
                    </li>
                </ul>
            </div>
            <div v-show="display_loading && !singer_list.length" class="loading-module">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getSingerList} from "api/singer";
    import BScroll from 'better-scroll'
    import Loading from 'base/loading/loading'
    import Singer from 'common/js/Singer'
    export default {
		name: "Singer",
        data(){
		    return {
		    	singer_list:[],
			    singer_list_map:[],
                singer_list_keys:[],
                singer_group_index_current:0,
                singer_group_height_list:[],
                display_loading:false
            }
        },
        created(){
			window.singer=this;
            getSingerList().then((data)=>{
                this.singer_list=data['data']['list'];
	            this.singer_list_map=this.formatSingerList(this.singer_list)
            })
        },
        mounted(){
		    setTimeout(()=>{
		    	this.initSingListScroll();
            },20)
        },
        computed:{

        },
        methods:{
            formatSingerList(){
                let map={},map_sort={},hot_singer=[];
                //建立歌手首字母与歌手列表group之间的映射
                for (let i=0;i<this.singer_list.length;i++){
                    let singer=this.singer_list[i];
                    singer=new Singer({
	                    singer_mid:singer.Fsinger_mid,
	                    singer_name:singer.Fsinger_name,
	                    singer_index:singer.Findex
                    })
                    if(i<10){
                        hot_singer.push(singer)
                    }
                    let charCode=singer.getSingerIndex().charCodeAt();
                    if(charCode>=65 && charCode<=90){
                        if(!(singer.getSingerIndex() in map)){
                            map[singer.getSingerIndex()]=[];
                            this.singer_list_keys.push(singer.getSingerIndex());
                        }
                        map[singer.getSingerIndex()].push(singer)
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
            },
	        initSingListScroll(){
	        	this.$refs.singer_list_wrapper.style.height=window.innerHeight-88+'px'
	        	this.display_loading=true;
	            this.scroll=new BScroll('.singer-list-wrapper',{
                    scrollX:false,
                    scrollY:true,
		            probeType: 3
                })
		        this.scroll.on('scroll', (pos) => {
			        let scrollY = Math.abs(Math.round(pos.y))
			        this.singer_group_index_current=this.getSingerGroupIndexCurrent(scrollY)
		        })
            },
	        selectSingerGroup(event){
	            this.scroll.scrollTo(0,-this.singer_group_height_list[event.target.dataset.index],400);
	            setTimeout(()=>{
		            this.singer_group_index_current=this.getSingerGroupIndexCurrent(this.scroll.getComputedPosition())
	            },500)
	        },
            getSingerGroupHeightList(){
                let singerGroup=document.getElementsByClassName('singer-group'),group_height_start=0;
                for (let i=0;i<singerGroup.length;i++){
                    this.singer_group_height_list.push(group_height_start)
                    group_height_start+=singerGroup[i].clientHeight
                }
            },
            getSingerGroupIndexCurrent(scrollY){
                for (let i =0;i<this.singer_group_height_list.length-1;i++){
                    if(scrollY>=this.singer_group_height_list[i] && scrollY <this.singer_group_height_list[i+1]){
                        return i;
                    }
                }
                return this.singer_group_height_list.length-1;
            }
        },
        watch:{
	        singer_list_map(){
	        	setTimeout(()=>{
	        	    this.scroll.refresh();
	        	    this.getSingerGroupHeightList();
                },100)
            }
        },
        components:{
	        Loading
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
    .loading-module
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
    .singer-index-nav
        position fixed
        top 50%
        right 0
        width 20px
        transform translateY(-40%)
        background-color $color-background-d
        border-radius 10px
        ul
            padding 20px 0
            border-radius 8px
            li
                color $color-text-d
                padding 3px
                text-align center
                font-size 12px
            li.active
                color $color-theme
</style>