/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-02 21:42:17
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-02 21:45:53
 * @FilePath: \hrsaas\src\api\employees.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// 封装员工信息的接口
import request from '@/utils/request'
/**
 * 获取员工的简单列表
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
