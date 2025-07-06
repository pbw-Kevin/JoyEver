<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="content">
    <h1>注册新用户</h1>
    <p style="color: rgb(var(--mdui-color-error))">注册暂不开放。</p>
    <mdui-text-field disabled label="用户名" required></mdui-text-field>
    <div style="width: 100%; height: 16px"></div>
    <mdui-text-field
      disabled
      type="password"
      toggle-password
      label="密码"
      required
    ></mdui-text-field>
    <div style="width: 100%; height: 16px"></div>
    <mdui-text-field
      disabled
      type="password"
      toggle-password
      label="确认密码"
      required
    ></mdui-text-field>
    <div style="width: 100%; height: 16px"></div>
    <mdui-text-field disabled type="email" label="邮箱（可选）"></mdui-text-field>
    <div style="width: 100%; height: 16px"></div>
    <mdui-button disabled>注册</mdui-button>
    <div>已有账号？<RouterLink to="/login">登录</RouterLink></div>
  </div>
</template>
