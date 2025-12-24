<script setup lang="ts">
import { appearanceSetting, backgroundImageSetting } from '@/assets/appearance'
</script>

<template>
  <div class="bg-img-container" v-if="backgroundImageSetting.url">
    <img
      class="bg-img"
      draggable="false"
      :src="backgroundImageSetting.url"
      :style="{ opacity: backgroundImageSetting.loaded ? appearanceSetting.backgroundImageOpacity : 0 }"
      @load="backgroundImageSetting.loaded = true"
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
