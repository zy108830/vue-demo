export default class Song {
	//留意一下es6中关于constructor传对象参数的写法。
	constructor({song_mid,song_name,song_album}){
		this.song_mid=song_mid;
		this.song_name=song_name;
		this.song_album=song_album;
	}
}