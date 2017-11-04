export default class Baidu{
    static statics(){
        var hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?c6a0be7a2e98e04ca2cf523568e2cbc4';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
    }
}