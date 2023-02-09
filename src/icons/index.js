/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-08 22:55:36
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-09 20:52:03
 * @FilePath: \hrsaas\src\icons\index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
/**
 * @param {7 8}
 * 将所有svg目录文件中的所有.svg的文件全部引入到项目中
 */
