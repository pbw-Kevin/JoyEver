<script setup lang="ts">
import { RouterLink } from 'vue-router'
import '@mdui/icons/keyboard-arrow-down.js'
import { requireLogin } from '@/assets/account.ts'

const ticketTypes = [
  { value: 'report-abuse', label: '滥用举报' },
  { value: 'report-bug', label: 'Bug 反馈' },
  { value: 'help-improve', label: '改进建议' },
  { value: 'complain', label: '申诉' },
  { value: 'contact-admin', label: '联系管理' },
  { value: 'other', label: '其他' },
]

requireLogin()
</script>

<template>
  <div class="content">
    <h1>我的工单</h1>
    <RouterLink to="/ticket"><mdui-button>新工单</mdui-button></RouterLink>
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
