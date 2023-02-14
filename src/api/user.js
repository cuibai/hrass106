/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-09 22:28:09
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-14 20:59:17
 * @FilePath: \hrsaas\src\api\user.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import request from '@/utils/request'
// 登录接口的封装
export function login(data) {
  // 返回一个promise 对象
  request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
