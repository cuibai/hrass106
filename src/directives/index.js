/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-20 21:35:03
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-20 21:55:09
 * @FilePath: \hrsaas\src\directives\index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * 创建快捷指令
 */
export const imagerror = {
  inserted(dom, options) {
    /**
     * @options: 指令中变量的解释
     * dom: 指令作用的dom对象
     * 当图片有地址,但是没有加载成功是 会触发onerror事件
     */
    dom.onerror = function() {
      /**
       * 图片出现异常 指令会指向默认配置
       * dom 可以注册error事件
       */
      dom.src = options.value
    }
  }
}
/**
 * <img v-imagerror="img">
 * img假设指向数据 data(){return{img:"地址"}}
 * option.value就是指向地址
 */
