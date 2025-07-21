<script setup lang="ts">
import { getAppearance } from '../assets/appearance.ts'
import { backgroundImageLoaded } from '../assets/appearance.ts'

var appearanceSettings = getAppearance()
</script>

<template>
  <div class="bg-img-container" v-if="appearanceSettings.backgroundImage">
    <img
      class="bg-img"
      draggable="false"
      :src="appearanceSettings.backgroundImage"
      :style="{ opacity: backgroundImageLoaded ? appearanceSettings.backgroundImageOpacity : 0 }"
      @load="backgroundImageLoaded = true"
    />
  </div>
</template>

<style scoped>
.bg-img-container {
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
</style>
