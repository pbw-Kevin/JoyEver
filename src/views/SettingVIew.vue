<script setup lang="ts">
import { isLoggedIn } from '../assets/account.ts'
import { sendNoti } from '../assets/notifications.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

if (!isLoggedIn()) {
  sendNoti('请先登录！')
  router.push({ name: 'Login' })
}

function saveAppearanceSetting(){

}
</script>

<template>
  <div class="content">
    <h1>设置</h1>
    <mdui-button>保存全部设置</mdui-button>
    <h2>全局设置</h2>
    <p>
      <mdui-text-field label="用户名" variant="outlined"></mdui-text-field>
      <mdui-text-field label="昵称"></mdui-text-field>
      <div>
        <mdui-text-field label="邮箱"></mdui-text-field>
        邮箱状态：<span>已验证✔</span><span>未验证❌</span>
        <mdui-button>邮箱验证</mdui-button>
        <mdui-checkbox>公开邮箱</mdui-checkbox>
        <br />
        <mdui-button>保存全局设置</mdui-button>
      </div>
    </p>
    <h2>游戏设置</h2>
    <p>
      <h3>自定义手势</h3>
      <mdui-checkbox>自动禁用不可用手势</mdui-checkbox>
      <br />
      <mdui-button>保存游戏设置</mdui-button>
    </p>
    <h2>外观</h2>
    <p>
      <h3>主题</h3>
      <br />
      <mdui-button @click="saveAppearanceSetting()">保存外观设置</mdui-button>
    </p>
  </div>
</template>

<style scoped>
mdui-text-field,mdui-checkbox,mdui-button{
  margin: 5px;
  vertical-align: middle;
}
</style>