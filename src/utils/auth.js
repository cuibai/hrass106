/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-09 22:28:09
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-14 21:12:29
 * @FilePath: \hrsaas\src\utils\auth.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设置一个唯一的 token
// 从缓存中读取 token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 将 token 写入到缓存
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除 token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
