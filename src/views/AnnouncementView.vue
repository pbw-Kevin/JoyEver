<script setup lang="ts">
import UserCard from '../components/UserCard.vue'
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container">
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
  height: calc(100vh - 240px);
  background-color: rgba(255, 255, 255, 0.7);
}

.chat-list {
  
}
</style>