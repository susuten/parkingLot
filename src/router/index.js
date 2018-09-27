import Vue from 'vue'
import Router from 'vue-router'

// 测试
import test from '@/components/test.vue'

import main from '@/components/main.vue'

// 登录
import login from '@/components/login/login'

// 注册
import register from '@/components/login/register'

// 首页
import home from '@/components/home/home'

// 个人中心
import person from '@/components/person/person'
import information from '@/components/person/information'
import password from '@/components/person/password'
import orders from '@/components/person/orders'
import comments from '@/components/person/comments'

// 查车位
import search from '@/components/search/search'
import details from '@/components/search/details'

// 公告
import postDetails from '@/components/post/postDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: '/main',
          redirect:'/home'
        },
        // 测试
        {
          path: '/test',
          name: 'test',
          component: test,
        },
        // 主页
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        // 个人中心
        {
          path: '/person',
          name: 'person',
          component: person,
          children: [
            {
                path: '/person',
                redirect: '/person/information'
            },
            {
                path: '/person/information',
                name: 'information',
                component: information,
            },
            {
                path: '/person/password',
                name: 'password',
                component: password,
            },
            {
                path: '/person/orders',
                name: 'orders',
                component: orders,
            },
            {
                path: '/person/comments',
                name: 'comments',
                component: comments,
            },
          ]
        },
        // 搜索
        {
          path: '/search',
          name: 'search',
          component: search,
        },
        {
          path: '/details',
          name: 'details',
          component: details,
        },

        // 公告详情
        {
          path: '/postDetails',
          name: 'postDetails',
          component: postDetails,
        }

      ]
    },
    
  ]
})

