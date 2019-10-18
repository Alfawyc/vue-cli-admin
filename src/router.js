import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

//引入二级路由
import { errorRoute } from '@/routes/error.js';
import { userRoute } from '@/routes/user.js';
import { financeRoute } from '@/routes/finance.js';

Vue.use(Router);

export default new Router({
	//mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
			children: [{
				path : '/',
				name : 'Dashboard',
				component: () => import(/*webpackChunkName: "base" */ "views/Dashboard")
			}]
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ "./views/About.vue")
		},
		{
			path: "/hello",
			name: "HelloWorld",
			meta : {
				title : 'hello'
			},
			component: () =>
				import(/* webpackChunkName: "about" */ "./components/HelloWorld.vue")
		},
		{
			path: "/login",
			name: "Login",
			meta : {
				title : '登陆',
			},
			component: () => import(/*webpackChunkName: "base" */ "views/Login.vue")
		},
		{
			path: '/user-manage',
			component: Home,
			meta: {
				title: '用户管理'
			},
			children : userRoute　
		},
		{
			path: '/finance-manege',
			component: Home,
			meta: {
				title: '资金管理'
			},
			children: financeRoute
		},
		{
			path : '/error-page',
			component: Home,
			meta : {
				title : '错误页面'
			},
			children: errorRoute 
		}
	]
});
