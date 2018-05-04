import {playMode} from 'common/js/config'
//状态管理
const state={
	singer:{},
	playing:false,
	fullScreen:false,
	playlist:[],
	sequenceList:[],
	mode:playMode.sequence,
	currentIndex:-1,
}

export default state;