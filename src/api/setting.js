/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-07 20:49:44
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-07 21:43:08
 * @FilePath: \hrsaas\src\api\setting.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/utils/request'
/**
 * @getRoleList
 * 获取角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * @getCompanyInfo
 * 定义获取公司的api
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
/**
 * @deleteRole 定义删除角色的api
 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
