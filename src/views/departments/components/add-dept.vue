<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-01 20:34:39
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-06 21:34:29
 * @FilePath: \hrsaas\src\views\departments\components\add-dept.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
// 设计新增部门的组件
<template>
  <!-- 配置一个x的操作 弹出层的回调函数 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单数据 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <!-- 需要循环生成选项   这里做一下简单的处理 显示的是用户名 存的也是用户名-->
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
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
        <el-button size="small" type="info" @click="btnCancel">取消</el-button>
        <el-button type="success" size="small" @click="btnOk">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartements, getDepartDetail, updateDepartments } from '@/api/departments'
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
      let isRepeat = false
      // 在操作前先判断当前的操作是编辑还是新增
      if (this.formData.id) {
        // 有id就是编辑模式
        /**
         * 编辑模式的要求
         * 1. 编辑的操作为编辑当前的节点 同级目录下不能存在相同的内容节点
         * 2. 在查找时 明确要查找的对象this.formData.id
         * 3. 查找id时 要跳过查找自身
         * 4. 在子模板下 this.formata.id 和 this.treenode.id
         */
        isRepeat = depts.filter(item => item.id !== this.formData.id && item.pid === this.treeNode.pid).some(item => item.name === value)
      } else {
        // 没有就是新增模式 沿用上一步的操作
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 获取的result-depets 存在需要的数据, 在同级部门进行数据的查找
      /**
       * 代码解释:
       * 从获取的内容中 进行筛选,筛选当前内容的pid和已有内容的pid的相同,验证pid节点下的name(部门名称)是否相同
       * 输出的值为 布尔,
       * 如果返回的值是true 那么当前操作属于重复操作 重复操作会显示指定的err提示
       * 没有错误 正常进入命名的编写规则
       */
      isRepeat ? callback(new Error(`当前操作重复,重复内容 ${value}`)) : callback()
    }
    // TODO:根据检测部门名称 检查编码名称
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartements()
      // 同上 方法操作内容的自定义操作
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        // 新增模式
        isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
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
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 配置获取员工数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 配置 点击事件
    btnOk() {
      // 点击确认后 判断当前的操作属于 新增还是编辑操作
      // 触发自己的表单检验 返回一个值
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            // 编辑
            await updateDepartments(this.formData)
          } else {
            // 新增
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          /**
           * 验证通过后 访问新增的数据接口提交数据
           * 因为是添加子部门 所以添加的pid就是当前部门的id
           * 回传的是两个参数
           * @addDepartments需要传入5个字段
           * 当前表单有4个
           * id是第五个
           */
          // 数据提交完毕 子组件提交到父组件 触发一个自定义事件
          this.$emit('addDepts')
          // 组件提交完毕 关闭弹层
          this.$emit('update:showDialog', false) // 触发事件
        }
      })
    },
    btnCancel() {
      // 为了后续的编辑 点击后需要清表单,resetfileds只能重置表单上的数据
      // 非表单上的数据不能处理
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      /**
       * 点击取消
       * 关闭弹层
       * 清除之前的校验数据
       */
      this.$emit('update:showDialog', false) // 取消校验
      this.$refs.deptForm.resetFields() // 关闭弹窗
    },
    // 父组件操作子组件 在子组件配置方法
    async getDepartDetail(id) {
      // 在父组件调用子组件的过程中props的值是异步的 直接获取,treenode的值又可能获取不到
      // 使用传参的方法去获取数据
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style></style>
