import Vue from "vue";
import App from "./App";
new Vue({
  el: 'body',
  components: {App}
});
/**
 * import是es6里面的语法
 * import后面接导入的模块,from表示从哪里导入
 *      如果from后面接的文件是export default,只导出了一个模块,则可以写成import aaa的形式
 *      否则就要写成import {aaa,bbb} 的形式
 * from有三种形式,相对路径,绝对路径,模块名
 *      如果是相对路径与绝对路径的话,则后缀名通常可以不写;
 *      如果是模块名的话,实际上对应的是node_modules文件夹下的文件夹
 *
 */