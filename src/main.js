// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './global.vue'
import store from './store'
import tips from './assets/js/tips.js'
import common from './assets/js/common.js'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import {currency} from './assets/js/currency'  // 带有名字的导出需要加上{}  金额格式化 小数点 逗号

Vue.config.productionTip = false
Vue.prototype.global = global
Vue.prototype.$http = axios

Vue.use(tips)
Vue.use(common)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

Vue.filter("currency", currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
