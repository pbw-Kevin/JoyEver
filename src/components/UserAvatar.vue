<script setup lang="ts">
const prop = defineProps<{
  url?: string
}>()
</script>

<template>
  <mdui-avatar slot="icon" :src="prop.url" v-if="prop.url"></mdui-avatar>
  <mdui-icon slot="icon" name="person" v-else></mdui-icon>
</template>
