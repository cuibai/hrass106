<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-22 21:40:49
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-02-27 21:47:08
 * @FilePath: \hrsaas\src\views\departments\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartements"
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartements } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '', manager: '' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
  created() {
    this.getDepartements() // 调用自身接口
  },
  methods: {
    async getDepartements() {
      const result = await getDepartements()
      // console.log(result)
      // 根据返回的数据更新内容
      this.company = { name: result.companyName, manager: '负责人' }
      // 使用转化方法 转化获取到的数据
      this.departs = tranListToTreeData(result.depts, '')
    }
  }
}
</script>
<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
