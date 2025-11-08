<script setup lang="ts">
import { logout } from '@/assets/account.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

logout()

router.push({ name: 'Home' })
</script>

<template>
  <div class="content">
    <h1>登出</h1>
  </div>
</template>
