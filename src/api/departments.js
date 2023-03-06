/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-27 21:10:32
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-06 21:36:30
 * @FilePath: \hrsaas\src\api\departments.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * @getDepartements新建组织架构的接口
 */
import request from '@/utils/request'
export function getDepartements() {
  return request({
    url: '/company/department'
  })
}
/**
 * @delDepartments删除组织架构的方法
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
    method: 'get' // GET
  })
}
/**
 * @addDepartments封装新增部门的api
 */
export function addDepartments(data) {
  return request({
    url: '/company/department/',
    method: 'POST',
    data
  })
}
/**
 * @getDepartDetail获取部门详情
 *
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}
/**
 * @updateDepartments 封装编辑部门的接口
 * data表示要上传的数据 id包含在data中 所以只需要一个数据就可以
 * 定义method类型 put
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
