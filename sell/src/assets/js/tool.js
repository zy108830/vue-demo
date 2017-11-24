import MobileDetect from 'mobile-detect';
export default class Tool{
    static getArg(key) {
        var url = window.location.href.toString(), u = url.split('?'), get, i, j;
        if (typeof u[1] === 'string') {
            u = u[1].split('&');
            get = {};
            for (i in u) {
                if (u.hasOwnProperty(i)) {
                    j = u[i].split('=');
                    get[j[0]] = j[1];
                }
            }
            var value=get[key];
            if(value){
                return value.replace('#/','')
            }
        }
    }
    static getProtocol(){
        switch (this.getAppEnv()){
            case 0:
                return 'http://';
            default:
                return 'https://'
        }
    }
    static getAppEnv(){
        var env=0;
        if(location.host=='web.test.psy-1.com'){
            env=1;
        }else if(this.arrIncludes(['www.psy-1.com','www.heartide.com'],location.host)){
            env=2;
        }
        return env;
    }

    /**
     * babel默认情况下，并不会对实例的属性与方法进行polyfill
     * 因此，没有直接使用[].includes()这种方法
     * @param arr
     * @param target
     * @returns {boolean}
     */
    static arrIncludes(arr,target){
        var include=false;
        for (var i=0;i<arr.length;i++){
            if (arr[i].indexOf(target)>-1){
                include=true;
                break;
            }
        }
        return include;
    }
    static getWebRoot(){
        var web_protocol=this.getProtocol(),host='';
        switch(this.getAppEnv()){
            case 0:
                 host='www.xxhh.com';
                 break;
            case 1:
                 host='web.test.psy-1.com';
                 break;
            case 2:
                host='www.psy-1.com';
                break;
        }
        return web_protocol+host;
    }
    static getApiRoot(){
        var host='api.xxhh.com';
        switch(this.getAppEnv()){
            case 0:
                host='api.xxhh.com';
                break;
            case 1:
                host='api.debug.psy-1.com';
                break;
            case 2:
                host='api.psy-1.com';
                break;
        }
        return this.getProtocol()+host;
    }
    static redirectIfPC(){
        var md = new MobileDetect(window.navigator.userAgent);
        if (!md.mobile()) {
            window.location.href = process.env.WEB_ROOT + '/mobileonly?redirect=' + window.location.href;
        }
    }
    static downloadSmallsleep(){
        var t = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.psyone.brainmusic';
        /micromessenger/i.test(navigator.userAgent) ? window.location.href = t : /weibo/i.test(navigator.userAgent) ? /android/i.test(navigator.userAgent) ? window.location.href = 'http://www.psy-1.com/download/android?src=5' : /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent) ? window.location.href = 'https://itunes.apple.com/cn/app/id1194338569?l=zh&ls=1&mt=8&dota2wings=id993071546' : window.location.href = t : /android/i.test(navigator.userAgent) ? window.location.href = 'http://www.psy-1.com/download/android?src=5' : /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent) ? window.location.href = 'https://itunes.apple.com/cn/app/id1194338569' : window.location.href = t;
    }
    static watchError(){
        var api_root=this.getApiRoot();
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            console.log(msg, url, lineNo, columnNo, error);
            if (url.indexOf('.js') > -1) {
                $.ajax({
                    url: api_root+'/exception/js',
                    type: 'post',
                    data: {
                        ua: $.ua,
                        errorInfo: arguments,
                        viewInfo: window.location.href
                    }
                });
            }
        };
    }
}