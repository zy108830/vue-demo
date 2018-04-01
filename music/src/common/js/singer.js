export default class Singer {
	//留意一下es6中关于constructor传对象参数的写法。
	constructor({singer_mid,singer_name,singer_index}){
		this.sing_mid=singer_mid;
		this.sing_name=singer_name;
		this.sing_index=singer_index;
	}

	getSingerAvatar(){
		return `//y.gtimg.cn/music/photo_new/T001R150x150M000${this.sing_mid}.jpg?max_age=2592000`
	}

	getSingerName(){
		return this.sing_name
	}

	getSingerIndex(){
		return this.sing_index
	}

	getSingerLink(){
		return `https://y.qq.com/n/yqq/singer/${this.sing_mid}.html#stat=y_new.singerlist.singerpic`
	}
}