import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {http_build_query} from "common/js/tool";

export function getRecommend() {
	let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
	let data = {
		g_tk: '1928093487',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: '0',
		format: 'jsonp',
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	}
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

export function getDiscList() {
	return axios({
		url: '/getDiscList',
		method: 'get',
		params: {
			"picmid": "1",
			"rnd": "0.39075734482345137",
			"g_tk": "1646990585",
			"jsonpCallback": "getPlaylist",
			"loginUin": "924714558",
			"hostUin": "0",
			"format": "json",
			"inCharset": "utf8",
			"outCharset": "utf-8",
			"notice": "0",
			"platform": "yqq",
			"needNewCode": "0",
			"categoryId": "10000000",
			"sortId": "5",
			"sin": "0",
			"ein": "29"
		}
	})
}
