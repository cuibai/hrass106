<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-22 21:40:49
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-07 22:01:23
 * @FilePath: \hrsaas\src\views\setting\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="公司管理">
            <!-- left -->
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
              >新增角色</el-button>
            </el-row>
            <!-- 给表格绑定数据 -->
            <el-table border="" :data="list">
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="120"
              />
              <el-table-column
                prop="name"
                label="角色名称"
                align="center"
                width="240"
              />
              <el-table-column prop="description" label="描述" align="center" />
              <el-table-column label="操作">
                <!-- 为了获取当前操作的按钮的标签 使用作用域插槽进行操作 -->
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                :total="page.total"
                :current-page="page.page"
                :page-size="page.pagesize"
                layout="prev,pager,next"
                @current-change="changePage"
              >
                <!-- 内容 -->
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              type="info"
              show-icon=""
              :closable="false"
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            />
            <!-- right -->
            <el-form>
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input v-model="formData.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入接口
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/setting'

import { mapGetters } from 'vuex'
export default {
  // 定义数据承接数据
  data() {
    return {
      // 承接数据
      list: [],
      // 页码以及相关数据
      page: {
        page: 1,
        pagesize: 10,
        total: 10 // total
      },
      formData: {
        // 放置公司信息
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取结构数据
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    changePage(newPage) {
      // newPage当前点击的页码
      // 当前的页码赋值给当前的最新页码
      this.page.page = newPage
      this.getRoleList() // 重新再获取一次信息
    },
    async deleteRole(id) {
      //  提示
      try {
        await this.$confirm('确认删除该角色吗')
        // 只有点击了确定 才能进入到下方
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
