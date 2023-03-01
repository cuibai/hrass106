/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-27 21:10:32
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-01 20:33:12
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
/**
 * 删除组织架构的方法
 */
export function delDepartments(id) {
  /**
   * 同样的地址 执行不同的业务
   * delete 删除
   * get 获取
   * post 新增或添加
   * put 修改
   */
  return request({
    url: `/company/department/${id}`, // 拼接一个id的地址
    method: 'delete'
  })
}
/**
 * 封装新增部门的 api
 */
export function addDepartments(data) {
  return request({
    url: '/company/department/',
    method: 'POST',
    data
  })
}
