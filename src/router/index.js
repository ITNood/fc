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
    },
    {
      path: '/home/news/index',
      name: 'news',
      component: () => {
        return import('../ivews/home/news/index')
      }
    },
    {
      path: '/home/news/details/index',
      name: 'details',
      component: () => {
        return import('../ivews/home/news/details/index')
      }
    },
    {
      path: '/my/set/mobile/index',
      name: 'mobile',
      component: () => {
        return import('../ivews/my/set/mobile/index')
      }
    },
    {
      path: '/my/set/password/index',
      name: 'password',
      component: () => {
        return import('../ivews/my/set/password/index')
      }
    },
    {
      path: '/my/set/pin/index',
      name: 'pin',
      component: () => {
        return import('../ivews/my/set/pin/index')
      }
    },
    {
      path: '/my/language/index',
      name: 'language',
      component: () => {
        return import('../ivews/my/language/index')
      }
    },
    {
      path: '/my/personality/index',
      name: 'personality',
      component: () => {
        return import('../ivews/my/personality/index')
      }
    },
    {
      path: '/my/about/index',
      name: 'about',
      component: () => {
        return import('../ivews/my/about/index')
      }
    },
    {
      path: '/fc/record/index',
      name:'record',
      component:()=>{
        return import('../ivews/fc/record/index')
      }
    },
    {
      path: '/fc/exchange/index',
      name: 'exchange',
      component: () => {
        return import('../ivews/fc/exchange/index')
      }
    },
    {
      path: '/fc/compensation/index',
      name: 'compensation',
      component: () => {
        return import('../ivews/fc/compensation/index')
      }
    },
    {
      path: '/fc/compensation/takeHistory/index',
      name: 'takeHistory',
      component: () => {
        return import('../ivews/fc/compensation/takeHistory/index')
      }
    },
    {
      path: '/fc/recycling/index',
      name: 'recycling',
      component: () => {
        return import('../ivews/fc/recycling/index')
      }
    }
  ]
})
