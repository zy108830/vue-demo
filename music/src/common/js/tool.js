export function http_build_query(data) {
	let query_string='';
	for (let i in data){
		//使用了es6模版字符串
		query_string+=`${i}=${encodeURIComponent(data[i])}&`;
	}
	return query_string.slice(0,-1);
}