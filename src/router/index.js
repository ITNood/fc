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
    },
    {
      path: '/home/history/index',
      name: 'history',
      component: () => {
        return import('../ivews/home/history/index')
      }
    },
    {
      path: '/home/cash/index',
      name: 'cash',
      component: () => {
        return import('../ivews/home/cash/index')
      }
    },
    {
      path: '/home/notes/index',
      name: 'notes',
      component: () => {
        return import('../ivews/home/notes/index')
      }
    },
    {
      path: '/my/usdt/index',
      name: 'usdt',
      component: () => {
        return import('../ivews/my/usdt/index')
      }
    },
    {
      path: '/my/set/index',
      name: 'set',
      component: () => {
        return import('../ivews/my/set/index')
      }
    },
    {
      path: '/my/invite/index',
      name: 'invite',
      component: () => {
        return import('../ivews/my/invite/index')
      }
    },
    {
      path: '/my/manage/index',
      name: 'manage',
      component: () => {
        return import('../ivews/my/manage/index')
      }
    }
  ]
})
