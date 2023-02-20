/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-08 22:55:36
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-20 21:27:36
 * @FilePath: \hrsaas\src\store\getters.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 在根级的getters上 开发子模块的属性给别人看 给别人用
  userId: state => state.user.userInfo.userId, // 建立用户id的映射
  name: state => state.user.userInfo.username, // 用户名快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto, // 定义一个头像的简写
  // 暂时占位的变量,后面有需要在改
  avatar: state => state.user.avatar
}
export default getters
