import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
// 引入全局过滤器
import '@/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
