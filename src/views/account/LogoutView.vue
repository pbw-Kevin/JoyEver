<script setup lang="ts">
import { logout } from '@/assets/account'
import { useRouter } from 'vue-router'

const router = useRouter()

logout()

router.push({ name: 'Home' })
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.operation.logout') }}</h1>
  </div>
</template>
