<script setup lang="ts">
import { appearanceSetting } from '@/assets/appearance'
import { backgroundImageLoaded } from '@/assets/appearance'
</script>

<template>
  <div class="bg-img-container" v-if="appearanceSetting.backgroundImage">
    <img
      class="bg-img"
      draggable="false"
      :src="appearanceSetting.backgroundImage"
      :style="{ opacity: backgroundImageLoaded ? appearanceSetting.backgroundImageOpacity : 0 }"
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
