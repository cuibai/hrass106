<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-12 21:24:13
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-12 22:14:59
 * @FilePath: \hrsaas\src\views\employees\components\add-employee.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
// 创建新增员工的信息弹层
<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <!-- 表单 -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formatEmployment" style="width:50%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 定义表单数据
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不为空', tigger: 'blur' }, { min: 1, max: 4, message: '用户名1-4位' }],
        mobile: [{ required: true, message: '手机号不为空', tigger: 'blur' }, { pattern: /^1[3-9]\d{9}$/, message: '手机好格式错误', tigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '聘用形式不为空', tigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不为空', tigger: 'blur' }],
        departmentName: [{ required: true, message: '部门名称不为空', tigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间不为空', tigger: 'blur' }]
      }
    }
  }
}
</script>

<style>

</style>
