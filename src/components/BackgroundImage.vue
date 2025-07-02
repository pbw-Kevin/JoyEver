<script setup lang="ts">
import { getAppearance } from '../assets/appearance.ts'

var appearanceSettings = getAppearance()
</script>

<template>
  <div class="bg-img" v-if="appearanceSettings.backgroundImage" :style="{
    'background-image': `url(${appearanceSettings.backgroundImage})`,
    'opacity':appearanceSettings.backgroundImageOpacity}" />
</template>

<style scoped>
.bg-img {
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-position: center;
  background-size: cover;
}
</style>