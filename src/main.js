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

Vue.config.productionTip = false

// Vue.component('icon-svg', IconSvg);//全局注册icon-svg


window.axios = axios;
window._api = _api;
window._g = _g;
window.routes = router;
window.Mock = Mock; //全局注册mock
window.Lockr = Lockr;

const routes = new VueRouter({
  router
});

//全局实例
const bus = new Vue();
window.bus = bus;

// window.HOST = window.location.protocol + '//' + window.location.host;

//axios全局配置
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers['Content-Type'] = 'application/json';

router.beforeEach((to, from, next) => {
  next();
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
