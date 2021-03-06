// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import echarts from 'echarts'
import VueNativeSock from 'vue-native-websocket'
var user=sessionStorage.userInfo?JSON.parse(sessionStorage.userInfo)[0].employeeNum:'0000'
Vue.use(VueNativeSock, 'ws://dvtest.qineasy.com:8888/websocket/'+user)
// Vue.use(VueNativeSock, 'ws://dvtest.qineasy.com:8888/websocket/'+JSON.parse(sessionStorage.userInfo)[0].employeeId)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts 
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  mode: 'history',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App),
  data: {
  	eventHub: new Vue()
  }
})
 