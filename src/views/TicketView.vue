<script setup lang="ts">
import '@mdui/icons/keyboard-arrow-down.js'
</script>

<template>
  <div class="content">
    <h1>工单</h1>
    <mdui-button>我的工单</mdui-button>
    <form>
      <mdui-text-field label="工单主题"></mdui-text-field>
      <mdui-select label="工单类型">
        <mdui-menu-item value="report-abuse">滥用举报</mdui-menu-item>
        <mdui-menu-item value="report-bug">Bug 反馈</mdui-menu-item>
        <mdui-menu-item value="help-improve">改进建议</mdui-menu-item>
        <mdui-menu-item value="complain">申诉</mdui-menu-item>
        <mdui-menu-item value="contact-admin">联系管理</mdui-menu-item>
        <mdui-menu-item value="other">其他</mdui-menu-item>
        <mdui-button-icon slot="end-icon">
          <mdui-icon-keyboard-arrow-down></mdui-icon-keyboard-arrow-down>
        </mdui-button-icon>
      </mdui-select>
    </form>
    <mdui-text-field rows="5" label="工单内容"></mdui-text-field>
    <mdui-button>提交工单</mdui-button>
  </div>
</template>

<style scoped>
mdui-text-field,
mdui-select,
mdui-button {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
