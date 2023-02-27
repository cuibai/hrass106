/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-27 21:10:32
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-27 21:13:13
 * @FilePath: \hrsaas\src\api\departments.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * 新建组织架构的接口
 */
import request from '@/utils/request'
export function getDepartements() {
  return request({
    url: '/company/department'
  })
}
