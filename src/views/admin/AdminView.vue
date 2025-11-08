<script setup lang="ts">
import { isAdmin } from '@/assets/account'
</script>

<template>
  <div class="content">
    <h1>管理</h1>
    <p v-if="!isAdmin()">
      尚未登录或没有管理权限。请<RouterLink to="/login">登录</RouterLink
      >具有管理员权限的账号以访问此页面。
    </p>
    <p v-else>开发中。</p>
  </div>
</template>
