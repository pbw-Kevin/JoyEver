<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { UpdateNavOpened, checkRoute } from '@/assets/navDrawer.ts'

const props = defineProps<{
  to?: string
  belongedRoutes?: Array<string>
  icon?: string
}>()
</script>

<template>
  <RouterLink :to="props.to" @click="UpdateNavOpened()" v-if="props.to">
    <mdui-list-item :icon="props.icon" rounded :active="checkRoute(belongedRoutes || [])">
      <slot></slot>
    </mdui-list-item>
  </RouterLink>
  <mdui-list-item :icon="props.icon" rounded :active="checkRoute(belongedRoutes || [])" v-else>
    <slot></slot>
  </mdui-list-item>
</template>
