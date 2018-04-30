<template>
    <div class="singer">
        <Scroll :probeType="3" @scroll="scrollListener" :data="singer_list" class="singer-list-wrapper" ref="singer_list_wrapper">
            <ul class="singer-group-list" v-show="singer_list.length>1">
                <li class="singer-group" v-for="singer_group,singer_index in singer_list_map">
                    <h2 class="singer-group-title">{{singer_index}}</h2>
                    <ul class="singer-list">
                        <li v-for="singer in singer_group" class="singer-item">
                            <a class="singer-link" @click="goSingerDetail(singer)">
                                <div class="singer-avatar">
                                    <img v-lazy="singer.singer_avatar" alt="">
                                </div>
                                <div class="singer-name">
                                    <p>{{singer.singer_name}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="singer-index-nav">
                <ul>
                    <li @touchstart.stop.prevent="touchStartSingerGroup" @touchmove.stop.prevent="touchMoveSingerGroup" :data-index="index" :class="{active:index==singer_group_index_current}" v-for="value,index in singer_list_keys">
                        {{value.substr(0,1)}}
                    </li>
                </ul>
            </div>
            <div v-show="display_loading && !singer_list.length" class="loading-module">
                <Loading></Loading>
            </div>
            <h2 ref="fixed_title" v-show="display_fixed_title" class="singer-group-title singer-group-title-fixed">{{fixed_title_content}}</h2>
        </Scroll>
        <router-view ></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getSingerList} from "api/singer";
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import Singer from 'common/js/Singer'
    import {mapMutations} from 'vuex'
    export default {
		name: "Singer",
        data(){
		    return {
		    	singer_list:[],
			    singer_list_map:[],
                singer_list_keys:[],
                singer_group_index_current:0,
                singer_group_height_list:[],
                display_loading:false,
                display_fixed_title:false
            }
        },
	    created(){
			//在data里面创建的变量会加observe，如下方式创建会提高性能
		    this.singer_group_index_touch={
			    touch_start:0,
			    touch_move:0,
			    index_start:0,
			    index_move:0
		    };
		    this.scrollY=0;
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
	        fixed_title_content(){
	        	if(this.singer_list_keys.length){
	        	    return this.singer_list_keys[this.singer_group_index_current];
                }else {
	        		return '热门';
                }
            }
        },
        methods:{
	        goSingerDetail(singer){
		        this.setSinger(singer);
	        	this.$router.push({
                    path : `/singer/${singer.singer_mid}`
	        	})
	        	return false;
            },
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
                    let charCode=singer.singer_index.charCodeAt();
                    if(charCode>=65 && charCode<=90){
                        if(!(singer.singer_index in map)){
                            map[singer.singer_index]=[];
                            this.singer_list_keys.push(singer.singer_index);
                        }
                        map[singer.singer_index].push(singer)
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
            scrollListener(pos){
                this.scrollY = Math.floor(pos.y)
                this.singer_group_index_current=this.getSingerGroupIndexCurrent()
                this.setFixedTitle()
            },
	        initSingListScroll(){
	        	this.display_loading=true;
            },
	        setFixedTitle(){
                if(this.scrollY>=0){
			        this.display_fixed_title=true
                }else {
	                this.display_fixed_title=true
            		let next_index=this.singer_group_index_current+1;
                    let offset=(-this.singer_group_height_list[next_index])-Math.abs(this.scrollY)
                    // console.log('偏移位置',offset)
                    //fixed_title的高度是30,offset没有取0是为了有更好的过渡性
                    if(offset>=-30 && offset<=3){
                        let fixed_title_top=Math.floor(88-(30-Math.floor(Math.abs(offset))))
                        console.log(fixed_title_top);
                        this.$refs.fixed_title.style.top=fixed_title_top+'px';
                    }else {
	                    this.$refs.fixed_title.style.top='88px';
                    }
                }
            },
	        touchMoveSingerGroup(event){
            	//根据滚动的距离计算滚动了多少个歌手组索引
		        this.singer_group_index_touch.touch_move=event.touches[0].pageY;
		        let touch_move_distance=(this.singer_group_index_touch.touch_move-this.singer_group_index_touch.touch_start);
		        let singer_group_index_height=18
		        let index_touch_offset=Math.floor(touch_move_distance/singer_group_index_height)
		        let singer_group_index_current=parseInt(this.singer_group_index_touch.index_start)+index_touch_offset;
		        if(singer_group_index_current>this.singer_list_keys.length-1){
			        singer_group_index_current=this.singer_list_keys.length-1
		        }
		        if(singer_group_index_current<0){
			        singer_group_index_current=0
		        }
		        this.singer_group_index_current=singer_group_index_current;
		        // console.log(`触摸滚动后的下标为`,this.singer_list_keys[singer_group_index_current])
		        this.scroll.scrollTo(0,-this.singer_group_height_list[this.singer_group_index_current],400);
		        // console.log(`滚动偏移的距离为${touch_move_distance}`,`应该移动${index_touch_offset}个下标`,`前往${-this.singer_group_height_list[this.singer_group_index_current]}`);
	        },
	        touchStartSingerGroup(event){
	            let time=400,index=event.target.dataset.index;
	            this.scroll.scrollTo(0,-this.singer_group_height_list[index],time);
	            //记录偏移
	            this.singer_group_index_touch.touch_start=event.touches[0].pageY;
	            this.singer_group_index_touch.index_start=index;
	            console.log(`触摸开始时的下标为`,this.singer_list_keys[index])
                this.singer_group_index_current=index;
	        },
            getSingerGroupHeightList(){
                let singerGroup=document.getElementsByClassName('singer-group'),group_height_start=0;
                for (let i=0;i<singerGroup.length;i++){
                    this.singer_group_height_list.push(group_height_start)
                    group_height_start+=singerGroup[i].clientHeight
                }
            },
            getSingerGroupIndexCurrent(){
	        	let scrollY=Math.abs(this.scrollY)
                for (let i =0;i<this.singer_group_height_list.length-1;i++){
                    if(scrollY>=this.singer_group_height_list[i] && scrollY <this.singer_group_height_list[i+1]){
                        return i;
                    }
                }
                return this.singer_group_height_list.length-1;
            },
            //...这种写法是vuex提供的语法糖
            ...mapMutations({
                setSinger:"SET_SINGER"
            })
        },
        watch:{
	        singer_list_map(){
	        	setTimeout(()=>{
	        	    this.getSingerGroupHeightList();
                },100)
            }
        },
        components:{
	        Loading,
	        Scroll
        }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .singer
        position fixed
        top 88px
        width 100%
        bottom 0
        .scroll
            height 100%
            overflow hidden
        .singer-group
            padding-bottom 30px
        .singer-group-title
            display block
            background-color $color-highlight-background
            color $color-text-l
            line-height 30px
            padding-left 20px
        .singer-group-title-fixed
            position fixed
            /*background-color red*/
            width 100%
            z-index 8
            top 88px
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