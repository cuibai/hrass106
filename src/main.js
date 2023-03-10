/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-08 22:55:36
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-10 21:59:16
 * @FilePath: \hrsaas\src\main.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control 权限控制
import * as directives from '@/directives' // 引入解决图片错误的指令
import Component from '@/components' // 引入公共组件的全局注册
// 引入过滤器工具
import * as filters from '@/filters' // 引入工具类
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
// 注册过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
Vue.use(Component) // 注册自己的插件

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
