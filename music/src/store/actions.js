/**
 * 使用场景
 * 1. 异步操作
 * 2. 在一个事件中操作多个mutation
 */
import * as types from './mutation-types'
export const selectPlay=({commit,state},{list,index})=>{
	commit(types.SET_SEQUENCELIST,list)
	commit(types.SET_PLAYLIST,list)
	commit(types.SET_CURRENTINDEX,index)
	commit(types.SET_FULLSCREEN,true)
	commit(types.SET_PLAYING,true)
}