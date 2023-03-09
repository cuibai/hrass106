<!--
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2023-03-09 20:39:28
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2023-03-09 20:55:53
 * @FilePath: \hrsaas\src\components\PageTools\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <!-- 前插槽 -->
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-warning" />
          <slot name="before" />
        </div>

      </el-col>
      <!-- 后插槽 -->
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  // 在设置图标时 希望左侧不传内容的时候 右侧的图标也不显示
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style lang='scss'>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }
</style>
