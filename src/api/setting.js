/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-07 20:49:44
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-08 21:37:33
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
/**
 * @getRoleDetail
 * 读取角色详情
 */
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
/**
 * @updateRole
 * 读取-修改角色
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
  })
}
/**
 * @addRole
 * 新增
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

