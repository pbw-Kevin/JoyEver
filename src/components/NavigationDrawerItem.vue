<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { UpdateNavOpened, checkRoute } from '../assets/navDrawer.ts'

const props = defineProps<{
  to: string
  belongedRoutes: Array<string>
  icon?: string
}>()
</script>

<template>
  <RouterLink :to="props.to" @click="UpdateNavOpened()">
    <mdui-list-item :icon="props.icon" rounded :active="checkRoute(belongedRoutes)">
      <slot></slot>
    </mdui-list-item>
  </RouterLink>
</template>
