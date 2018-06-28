{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import iview from 'iview'
import 'iview/dist/styles/iview.css';
import http from './assets/js/http'
import * as Utils from './assets/js/utils'

import router from './router'
import store from './store'

Vue.use(iview);
Vue.config.productionTip = false;
Vue.config.debug = true;
Vue.prototype.$utils = Utils;
Vue.prototype.$axios = http;


// 路由拦截
router.beforeEach((to, from, next) => {
	
});



// http request 拦截器 发出请求
axios.interceptors.request.use( config => {
        return config;
    },
    err => {
        return Promise.reject(err);
});
 
// http response 拦截器 收到请求
axios.interceptors.response.use( response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
