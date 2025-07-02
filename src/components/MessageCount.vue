<script setup lang="ts">
const prop = defineProps<{
  msgcnt?: number
}>()
</script>

<template>
  <mdui-badge class="message-count" v-if="prop.msgcnt && prop.msgcnt > 0">{{ prop.msgcnt }}</mdui-badge>
</template>

<style scoped>
mdui-badge.message-count {
  position: absolute;
}
</style>