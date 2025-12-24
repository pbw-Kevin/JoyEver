<script setup lang="ts">
import { backgroundImageSetting } from '@/assets/appearance'
</script>

<template>
  <mdui-bottom-app-bar :class="{ withBgImg: backgroundImageSetting.loaded }">
    <p>
      Online JoyEver &copy; 2025 JoyEver Dev Team<br />
      <a href="https://github.com/pbw-Kevin/JoyEver" target="_blank">GitHub Repository</a>
    </p>
  </mdui-bottom-app-bar>
</template>

<style scoped>
mdui-bottom-app-bar.withBgImg {
  opacity: var(--sidebar-opacity, 0.7);
  transition: 0.5s;
}

mdui-bottom-app-bar.withBgImg:hover {
  opacity: 1;
}
</style>
