<script setup lang="ts">
import { isLoggedIn } from '../assets/account.ts'
import { sendNoti } from '../assets/notifications.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

if (!isLoggedIn()) {
  sendNoti('请先登录！')
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="content">
    <h1>设置</h1>
    <h2>全局设置</h2>
    <p>
      <mdui-checkbox>公开邮箱</mdui-checkbox>
    </p>
    <h2>游戏设置</h2>
    <p></p>
    <h2>外观</h2>
    <p></p>
  </div>
</template>
