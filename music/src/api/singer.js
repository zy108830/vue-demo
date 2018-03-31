import jsonp from 'common/js/jsonp'
import {http_build_query} from "common/js/tool";

export function getSingerList() {
	let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
	let data = {
		"channel": "singer",
		"page": "list",
		"key": "all_all_all",
		"pagesize": "100",
		"pagenum": "1",
		"g_tk": "5381",
		"loginUin": "0",
		"hostUin": "0",
		"format": "jsonp",
		"inCharset": "utf8",
		"outCharset": "utf-8",
		"notice": "0",
		"platform": "yqq",
		"needNewCode": "0",
	}
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}
