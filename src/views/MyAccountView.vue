<script setup lang="ts">
import { isLoggedIn } from '../assets/account.ts';
import { sendNoti } from '../assets/notifications.ts';
import { useRouter } from 'vue-router'

const router = useRouter()

if(!isLoggedIn()){
  sendNoti("请先登录！");
  router.push({ name: 'Login' });
}
</script>

<template>
  <div class="content">
    <h1>我的账号</h1>
  </div>
</template>
