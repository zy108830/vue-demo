//状态更改
import * as types from './mutation-types'
const mutations={
	// 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
	[types.SET_SINGER](state,singer){
		state.singer=singer;
	},
	[types.SET_PLAYING](state,flag){
		state.playing=flag
	},
	[types.SET_FULLSCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,list){
		state.playlist=list
	},
	[types.SET_SEQUENCELIST](state,list){
		state.sequenceList=list
	},
	[types.SET_MODE](state,flag){
		state.mode=flag
	},
	[types.SET_CURRENTINDEX](state,index){
		state.currentIndex=index
	}
}
export default mutations