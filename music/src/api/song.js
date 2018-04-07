import axios from 'axios'
import jsonp from 'common/js/jsonp'
function getSongVkey(songmid) {
	let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
	let data = {
		"g_tk": "5381",
		"loginUin": "0",
		"hostUin": "0",
		"format": "json",
		"inCharset": "utf8",
		"outCharset": "utf-8",
		"notice": "0",
		"platform": "yqq",
		"needNewCode": "0",
		"cid": "205361747",
		"callback": "MusicJsonCallback9913904357456054",
		"uin": "0",
		"songmid": songmid,
		"filename": `C400${songmid}.m4a`,
		"guid": "9271247908",
	}
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

function getSongUrl(songmid) {
	getSongVkey(songmid).then(()=>{

	})
}

export {getSongVkey,getSongUrl}