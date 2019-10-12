import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => {
        return import('../ivews/login')
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => {
        return import('../ivews/forget')
      }
    },
    {
      path: '/home/index',
      name: 'home',
      component: () => {
        return import('../ivews/home/index')
      }
    },
    {
      path: '/fc/index',
      name: 'fc',
      component: () => {
        return import('../ivews/fc/index')
      }
    },
    {
      path: '/my/index',
      name: 'my',
      component: () => {
        return import('../ivews/my/index')
      }
    },
    {
      path: '/home/invest/index',
      name: 'invest',
      component: () => {
        return import('../ivews/home/invest/index')
      }
    }
  ]
})
