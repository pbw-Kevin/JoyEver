<script setup lang="ts">
import { getAppearance } from '../assets/appearance.ts';

var appearanceSettings = getAppearance();
</script>

<template>
  <mdui-bottom-app-bar :class="{withBgImg: appearanceSettings.backgroundImage}">
    Online JoyEver &copy; 2025 JoyEver Dev Team<br />
    GitHub Repository
  </mdui-bottom-app-bar>
</template>

<style scoped>
mdui-bottom-app-bar.withBgImg {
  opacity: 0.7;
  transition: 0.5s;
}

mdui-bottom-app-bar.withBgImg:hover {
  opacity: 1;
}
</style>
