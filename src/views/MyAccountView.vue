<script setup lang="ts">
import { isLoggedIn } from '../assets/main.ts';
import { useRouter } from 'vue-router'

const router = useRouter()

if(!isLoggedIn()){
  router.push({ name: 'Login' });
}
</script>

<template>
  <div class="content">
    <h1>我的账号</h1>
  </div>
</template>
