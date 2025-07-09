<script setup lang="ts">
import { ref } from 'vue'
import '@mdui/icons/question-mark.js'
import { getHint } from '../assets/hints.js'

var hint = ref(getHint())
</script>

<template>
  <div class="hint" @click="hint = getHint()">
    <div class="hint-icon">
      <mdui-icon-question-mark></mdui-icon-question-mark>
    </div>
    <div class="hint-content">
      <h3>你知道吗？</h3>
      <div class="hint-text">{{ hint }}</div>
    </div>
  </div>
</template>

<style scoped>
.hint {
  display: flex;
  width: 300px;
  user-select: none;
  overflow: overlay;
}

.hint-content {
  flex-grow: 1;
}

mdui-icon-question-mark {
  width: 60px;
  height: 60px;
}
</style>
