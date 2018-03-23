import jsonp from 'common/js/jsonp'
export default function getRecommend() {
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
	return jsonp(url,data,{
		param: 'jsonpCallback'
	})
}