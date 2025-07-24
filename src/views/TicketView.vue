<script setup lang="ts">
import '@mdui/icons/keyboard-arrow-down.js'

const ticketTypes = [
  { value: 'report-abuse', label: '滥用举报' },
  { value: 'report-bug', label: 'Bug 反馈' },
  { value: 'help-improve', label: '改进建议' },
  { value: 'complain', label: '申诉' },
  { value: 'contact-admin', label: '联系管理' },
  { value: 'other', label: '其他' }
]
</script>

<template>
  <div class="content">
    <h1>工单</h1>
    <mdui-button>我的工单</mdui-button>
    <h2>新工单</h2>
    <form>
      <mdui-text-field label="工单主题"></mdui-text-field>
      <mdui-select label="工单类型">
        <mdui-menu-item
          v-for="type in ticketTypes"
          :value="type.value"
        >{{ type.label }}</mdui-menu-item>
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
