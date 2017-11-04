import Axios from 'axios';
import Tool from './tool';

export default class Weixin {
    constructor () {

    }

    static isWeixinBrowser () {
        return /micromessenger/i.test(navigator.userAgent);
    }

    getWxConfig () {
        var promise = new Promise(function (resolve, reject) {
            var web_root = Tool.getWebRoot();
            Axios.get(web_root + '/common/weixin/share-config?weixin_url=' + encodeURIComponent(window.location.href)).then(response => {
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.statusText));
                }
            });
        });
        return promise;
    }

    configReady (cb) {
        this.getWxConfig().then(function (config) {
            console.log('获取到的在线参数：', config);
            wx.config(config);
            cb(config);
        }, function (error) {
            console.log(error);
        });
    }
    setShareContent (shareContent) {
        wx.ready(function () {
            wx.onMenuShareAppMessage(shareContent['appMsg']);
            wx.onMenuShareTimeline(shareContent['timeline']);
        });
    }
    static getShareContentDom (shareContent) {
        var appMsg = shareContent['appMsg'];
        var timeline = shareContent['timeline'];
        var img = shareContent['img'];
        return JSON.stringify({
            'type1': {
                'title': appMsg.title,
                'desc': appMsg.desc,
                'link': appMsg.link,
                'imgUrl': appMsg.imgUrl,
                'shareType': 1
            },
            'type2': {
                'title': timeline.title,
                'link': timeline.link,
                'imgUrl': timeline.imgUrl,
                'shareType': 2
            },
            'type3': {
                'imgUrl': shareContent['img'] || '',
                'shareType': 3
            }
        });
    }
}