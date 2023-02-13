/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-09 22:28:09
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-10 20:34:03
 * @FilePath: \hrsaas\src\utils\request.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import axios from 'axios'

const service = axios.create()
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use()

export default service
