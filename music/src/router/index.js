import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)
const router = new Router({
	routes: [{
		path: '/',
		redirect: '/recommend'
	}, {
		path: '/recommend',
		component: Recommend
	}, {
		path: '/rank',
		component: Rank
	}, {
		path: '/singer',
		component: Singer,
		children:[
			{
				path:':id',
				component:SingerDetail
			}
		]
	}, {
		path: '/search',
		component: Search
	}]
});
export default router
