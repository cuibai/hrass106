/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-08 22:55:36
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-15 21:41:23
 * @FilePath: \hrsaas\src\store\modules\user.js
 * @Description:
 *
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
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
    // 调用api 接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
