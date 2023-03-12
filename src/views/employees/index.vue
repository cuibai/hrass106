<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-22 21:40:49
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-12 21:42:51
 * @FilePath: \hrsaas\src\views\employees\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧-总记录 -->
        <template v-slot:before>
          <span>一共166条记录</span>
        </template>
        <!-- 右侧-显示按钮 -->
        <template v-slot:after>
          <el-button size="small" type="primary">Exccel 导入</el-button>
          <el-button size="small" type="primary">Exccel 导入</el-button>
          <el-button icon="plus" size="small" type="primary" @click="showDialog=true">新增员工数据</el-button>
        </template>
      </page-tools>
      <!-- 表格组件  使用loading 控制显示-->
      <el-card>
        <el-table v-loading="loading" :data="list" border>
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable="" :formatter="formatEmployment" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column label="入职时间" sortable="" align="center">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" align="center" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click=" delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
// 格式化聘用形式
import EmployeeEnum from '@/api/constant/employees'
// 引入 子文件 弹层
import AddEmployee from './components/add-employee.vue'
export default {
  components: { AddEmployee },
  data() {
    return {
      loading: false,
      showDialog: false, // 默认弹层关闭 在需要时打开
      list: [], // 接收getEmployeeList返回的数据
      page: {
        page: 1,
        size: 10,
        total: 0 // 总数
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    changePage(newpage) {
      this.page.page = newpage // 点击的页面 传值
      this.getEmployeeList() // 重新获取数据
    },
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.total = total
      this.list = rows
      this.loading = false
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 定义删除按钮的绑定方法
    async delEmployee(id) {
      // 删除操作 先提示 再操作
      try {
        await this.$confirm('是否确定该操作?')
        await delEmployee(id)
        // 重新更新数据
        this.getEmployeeList()
        this.$message.success('删除操作成功!')
      } catch (e) {
        // 输出错误
        console.error(e)
      }
    }
  }

}
</script>

<style></style>
