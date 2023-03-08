<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-02-22 21:40:49
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-08 21:53:15
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
                @click="showDialog=true"
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
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
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
    <!-- 放置一个编辑的弹层 -->
    <el-dialog title="编辑部门" :visible="showDialog" @click="btnCancel">
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
        <!-- 放置一个插槽 -->
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">确认</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'

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
      },
      // 配置弹层的显示和隐层
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        // 配置角色数据的规则
        name: [{ required: true, message: '配置的角色名称不能为空', trigger: 'blur' }]
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
    },
    async editRole(id) {
      this.showDialog = true
      this.roleForm = await getRoleDetail(id)
    },
    async btnOk() {
      try {
        // 对表单进行整体校验
        await this.$refs.roleForm.validate()
        // 判断当前的操作是 编辑or新增
        if (this.roleForm.id) {
          // 编辑 通过校验 执行下方的内容 更新内容
          await updateRole(this.roleForm)
        } else {
          // 新增
          await addRole(this.roleForm)
        }

        this.getRoleList()
        this.$message.success('编辑操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
        alert('校验环节失败!')
      }
    },
    btnCancel() {
      // 内容制空
      this.roleForm = {
        name: '',
        description: ''
      }
      // 清空校验
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    }

  }
}
</script>

<style></style>
