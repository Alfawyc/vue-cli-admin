import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import _api from './api';
import _g from './global';
import ElementUI from 'element-ui';
import '@/element-variables.scss';
Vue.use(ElementUI, { size: 'small' })
import VueRouter from 'vue-router';
// import IconSvg from 'components/IconSvg/IconSvg'
import './components/IconSvg/index'; // iconSvg
import Mock from './mock';
import Lockr from 'lockr';
import filter from './filter';

Vue.config.productionTip = false

// Vue.component('icon-svg', IconSvg);//全局注册icon-svg
const routes = new VueRouter({
  router
});

//全局注册
window.axios = axios;
window._api = _api;
window._g = _g;
window.router = routes;
window.Mock = Mock; //全局注册mock
window.Lockr = Lockr;



//全局实例
const bus = new Vue();
window.bus = bus;

//window.HOST = window.location.protocol + '//' + window.location.hostname + ':9191';

//axios全局配置
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers['Content-Type'] = 'application/json';
window.axios.defaults.baseURL = window.HOST;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - Alfa Admin' || "Alfa Admin"
  next();
});


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

const app = new Vue({
  el: '#app',
  router,
  store,
  filters: filter,
  render: h => h(App)
});
