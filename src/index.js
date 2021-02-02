import Vue from 'vue'
import App from './app.vue'
import Antd from 'ant-design-vue'
import {routes} from './router'
import vueRouter from 'vue-router'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.use(vueRouter)
const router=new vueRouter({
  // mode:'history',
  routes:routes
})
new Vue({
  el:'#app',
  router,
  components:{App},
  template:'<App/>'
})