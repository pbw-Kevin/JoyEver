<script lang="ts" setup>
import { notiContentRef } from '../assets/topNotification'

import '@mdui/icons/info.js'
import '@mdui/icons/close.js'
</script>

<template>
  <div class="top-notification" v-if="notiContentRef">
    <mdui-card variant="outlined">
      <mdui-icon-info />
      <div class="top-notification-content">
        {{ notiContentRef }}
      </div>
      <mdui-button-icon>
        <mdui-icon-close @click="notiContentRef = ''" />
      </mdui-button-icon>
    </mdui-card>
  </div>
</template>

<style scoped>
mdui-card {
  width: 100%;
  background-color: rgb(var(--mdui-color-primary-container));
  display: flex;
  align-items: center;
  padding: 10px;
}

.top-notification-content {
  flex: 1;
  margin: 0 10px;
}
</style>
