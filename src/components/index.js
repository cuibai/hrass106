/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-09 21:13:07
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-09 21:25:16
 * @FilePath: \hrsaas\src\components\index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// 负责所有全局组件的注册组件
import PageTools from './PageTools'
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
  }
}
