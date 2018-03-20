import originJSONP from 'jsonp'
/**
 * 导出一个对jsonp模块进行二次封装的函数，用于支持Promise与query_args_object
 * //使用了es6 中的promise、模版字符串、函数的默认参数
 * @param url request_url
 * @param data query_args_object
 * @param options jsonp options
 * @returns {Promise<any>}
 */
export default function jsonp(url,data,options) {
	return new Promise((resolve, reject)=>{
		let join_url=`${url}?${http_build_query(data)}`;
		originJSONP(join_url,options,(err, data)=>{
			if(!err){
				resolve(data);
			}else {
				reject(err);
			}
		})
	})
}

function http_build_query(data) {
	let query_string='';
	for (let i in data){
		//使用了es6模版字符串
		query_string+=`${i}=${encodeURIComponent(data[i])}&`;
	}
	return query_string.slice(0,-1);
}