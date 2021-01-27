import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import error from "./views/Error.vue";

//引入二级路由
import { errorRoute } from '@/routes/error.js';
import { userRoute } from '@/routes/user.js';
import { financeRoute } from '@/routes/finance.js';
import { systemRoute } from '@/routes/system.js';
import { productRoute } from '@/routes/product.js';
import { shareRoute } from '@/routes/share.js';
import { CateRoute } from '@/routes/cate.js';
import { TaskRouter } from '@/routes/task.js'

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
				component: () => import(/*webpackChunkName: "base" */ "views/Dashboard"),
				meta : {
					title : 'Dashboard'
				}
			}]
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
			path: '/share-manage',
			component: Home,
			meta: {
				title: 'Element'
			},
			children: shareRoute
		},
		{
			path: '/product-manage',
			component: Home,
			meta: {
				title: '产品管理',
			},
			children: productRoute
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
			path: '/system-list',
			component: Home,
			meta: {
				title: '系统设置'
			},
			children: systemRoute
		},
		{
			path: '/cate',
			component: Home,
			meta:{
				title: '博客管理'
			},
			children: CateRoute
		},
		{
			path : '/error-page',
			component: Home,
			meta : {
				title : '错误页面'
			},
			children: errorRoute 
		},
		{
			path:"/task",
			component: Home,
			meta: {
				title: '任务管理'
			},
			children: TaskRouter
		},
		{
			path: '*',
			component: error,
			name: 'error'
		}
	]
});
