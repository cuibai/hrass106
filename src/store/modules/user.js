/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-08 22:55:36
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-14 21:28:34
 * @FilePath: \hrsaas\src\store\modules\user.js
 * @Description:
 *
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
// 外边定义三个变量 简化代码
// 状态
const state = {
  token: getToken() // 设置token 为共享状态 初始化vue 先从缓存中拿token
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据置空
    // vuex置空  缓存也置空 保证数据的持久化
    removeToken()
  }
}
// 执行异步
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await this.login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    if (result.data.success) {
      // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
      // 现在有用户token
      // actions 修改state 必须通过mutations
      context.commit('setToken', result.data.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
