<script setup lang="ts">
import '@mdui/icons/person.js'

const prop = defineProps<{
  url?: string
}>()
</script>

<template>
  <mdui-avatar :src="prop.url" v-if="prop.url"></mdui-avatar>
  <mdui-icon-person v-else></mdui-icon-person>
</template>
