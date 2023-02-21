/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-09 22:28:09
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-21 21:53:51
 * @FilePath: \hrsaas\src\utils\request.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// 配置时间戳函数
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 配置超时函数
const service = axios.create({
  // 配置编译环境和发布环境下的访问地址
  /**
   * 执行 npm run dev 执行基础地址/api就可以触发跨域
   */
  baseURL: process.env.VUE_APP_BASE_API, // /dev/api prod/api
  timeout: 5000 // 配置等待超时
})
/**
 * 请求拦截器
 * 凡是需要开门的地址 一律需要钥匙
 * */
service.interceptors.request.use(config => {
  // config 是请求信息,任何时候都是要返回的
  // 拿到token 注入token
  if (store.getters.token) {
    // token 注入完毕 检测时间戳是否超时
    if (IsCheckTimeOut) {
      // 根据返回结果做操作 true token过期了
      // 调用退出操作
      store.dispatch('user/logout')
      // 返回登录页
      router.push('/login')
      return Promise.reject(new Error('token 登录超时,请重新登录'))
    }
    // 判断getter快捷访问中指向的token是否存在,数据改写为要求的
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 数据改写完毕,输出config
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})
// 配置超时函数
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  console.log(currentTime - timeStamp)
  return (currentTime - timeStamp) / 100000 > TimeOut
}

export default service
