/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-08 22:55:36
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-18 17:39:35
 * @FilePath: \hrsaas\src\store\modules\user.js
 * @Description:
 *
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
// 外边定义三个变量 简化代码
// 状态
const state = {
  token: getToken(), // 设置token 为共享状态 初始化vue 先从缓存中拿token
  userInfo: {} // 定义一个空对象,不适null 因为在后面的getters数据访问 null 会产生报错和异常
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
  },
  // 设置用户信息
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {} // 删除数据  将数据的值重新置为空
  }
}
// 执行异步
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    // 调用api 接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  },
  async getUserInfo(context) {
    // 调用接口 共享数据
    const result = await getUserInfo() // 获取返回值
    context.commit('setUserInfo', result) // 提交到mutation
    return result // 用作后期做权限
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
