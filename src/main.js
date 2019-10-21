// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/default.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import vueiInfinite from 'vue-infinite-scroll'
import i18n from './i18n/i18n'

// import store from './ivews/store/index'

Vue.use(vueiInfinite)
Vue.use(ElementUI)

Vue.config.productionTip = false
//添加cookie
// axios.defaults.withCredentials = true
// Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  //store:store,
  components: { App },
  template: '<App/>'
})
