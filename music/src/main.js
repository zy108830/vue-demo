import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import 'common/stylus/index'

Vue.use(VueLazyload,{
	'loading':require('common/image/default.png')
})

fastclick.attach(document.body)
Vue.config.productionTip = false
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
