/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-09 22:28:09
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-20 21:12:49
 * @FilePath: \hrsaas\src\api\user.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import request from '@/utils/request'
// 登录接口的封装
export function login(data) {
  // 返回一个promise 对象
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 *
 * @param { getUserInfo}
 * 获取用户名
 */
export function getUserInfo() {
  // TODO:共享出去的方法必须加返回值
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 为了方便获取用户的头像显示
 * 封装一个单独的接口
 * 解决当前情况
 * 注意: 用户所需要的的id 在上一个接口处 已经获取到了
 * 可以直接在后面的内容中使用
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {

}
