<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-01 20:34:39
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-02 21:59:06
 * @FilePath: \hrsaas\src\views\departments\components\add-dept.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
// 设计新增部门的组件
<template>
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单数据 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <!-- 需要循环生成选项   这里做一下简单的处理 显示的是用户名 存的也是用户名-->
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门简介" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 确定 & 消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="info">取消</el-button>
        <el-button type="success" size="small">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartements } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {

  // 配置一个组件来控制窗口的显示和隐藏
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 为了解决在新增文件的时候,出现当前增加和其它增加出现重复的情况,需要对于所增加的pid 进行配置
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否存在重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value 部门组件 名称去和当前已经存在的名称进行比较
      // 调取获取名称的接口
      const { depts } = await getDepartements()
      // 获取的result-depets 存在需要的数据, 在同级部门进行数据的查找
      /**
       * 代码解释:
       * 从获取的内容中 进行筛选,筛选当前内容的pid和已有内容的pid的相同,验证pid节点下的name(部门名称)是否相同
       * 输出的值为 布尔,
       * 如果返回的值是true 那么当前操作属于重复操作 重复操作会显示指定的err提示
       * 没有错误 正常进入命名的编写规则
       */
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`当前操作重复,重复内容 ${value}`)) : callback()
    }
    // TODO:根据检测部门名称 检查编码名称
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartements()
      const isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: [] // 接收获取的员工简单列表的数据
    }
  },
  methods: {
    // 配置获取员工数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    }
  }
}
</script>

<style></style>
