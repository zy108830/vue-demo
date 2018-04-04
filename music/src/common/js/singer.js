export default class Singer {
	//留意一下es6中关于constructor传对象参数的写法。
	constructor({singer_mid,singer_name,singer_index}){
		this.singer_mid=singer_mid;
		this.singer_name=singer_name;
		this.singer_index=singer_index;
	}

	getSingerMid(){
		return this.singer_mid
	}

	getSingerAvatar(){
		return `//y.gtimg.cn/music/photo_new/T001R150x150M000${this.singer_mid}.jpg?max_age=2592000`
	}

	getSingerName(){
		return this.singer_name
	}

	getSingerIndex(){
		return this.singer_index
	}

	getSingerLink(){
		return `https://y.qq.com/n/yqq/singer/${this.singer_mid}.html#stat=y_new.singerlist.singerpic`
	}
}