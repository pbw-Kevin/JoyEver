<script setup lang="ts">
import UserCard from '../components/UserCard.vue'
import { chatContainerHeight } from '../assets/height.ts'
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container" :style="{ height: chatContainerHeight + 'px' }">
      <div class="chat-list">
        <mdui-list>
          <UserCard nickname="公告" isAnnouncement />
        </mdui-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex-grow: 1;
}

.chat-container {
  background-color: rgba(255, 255, 255, 0.7);
}

/* .chat-list {
} */
</style>
