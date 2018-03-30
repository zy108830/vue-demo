import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index'

Vue.use(VueLazyload,{
	'loading':require('common/image/default.png')
})

fastclick.attach(document.body)
Vue.config.productionTip = false
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
