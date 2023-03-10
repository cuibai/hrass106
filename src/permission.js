/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-09 22:28:09
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-18 18:00:54
 * @FilePath: \hrsaas\src\permission.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// 权限拦截 导航守卫 路由守卫  router
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
// 路由的前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  //  首先判断有无token
  if (store.getters.token) {
    //   如果有token 继续判断是不是去登录页
    // 有token 的情况下 获取用户资料
    if (to.path === '/login') {
      //  表示去的是登录页
      next('/') // 跳到主页
    } else {
      /**
       * 放行过去后,开始获取用户名资料
       * 检测vuex中是否存在用户资料的唯一标识 用户ID 就不需要获取,无ID则需要获取
       */
      if (!store.getters.userId) {
        // 没有id需要获取资料
        await store.dispatch('user/getUserInfo')
        // 使用异步操作 需要先获取数据后在跳转页面
      }
      next()
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 如果找到了 表示在在名单里面
      next()
    } else {
      next('/login') // 跳到登录页
      // 帮助继续学习下面的进程 ,先关闭token的校验
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
