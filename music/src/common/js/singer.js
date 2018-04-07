export default class Singer {
	//留意一下es6中关于constructor传对象参数的写法。
	constructor({singer_mid,singer_name,singer_index}){
		this.singer_mid=singer_mid;
		this.singer_name=singer_name;
		this.singer_index=singer_index;
		this.singer_avatar=this.normalizeSingerAvatar(singer_mid)
		this.singer_link=this.normalizeSingerLink(singer_mid)
	}

	normalizeSingerAvatar(singer_mid){
		return `//y.gtimg.cn/music/photo_new/T001R300x300M000${singer_mid}.jpg?max_age=2592000`
	}

	normalizeSingerLink(singer_mid){
		return `https://y.qq.com/n/yqq/singer/${singer_mid}.html#stat=y_new.singerlist.singerpic`
	}
}