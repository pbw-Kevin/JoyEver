<script setup lang="ts">
import '@mdui/icons/chat.js'
import MessageChatList from '../components/MessageChatList.vue'
import { chatContainerHeight } from '../assets/height.ts'
import { isDesktop } from '../assets/appearance.ts'
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container" :style="{ height: chatContainerHeight + 'px' }">
      <MessageChatList
        :style="{ width: isDesktop ? '250px' : '100%', minWidth: isDesktop ? '250px' : '100%' }"
      ></MessageChatList>
      <div class="chat-box" v-if="isDesktop">
        <mdui-icon-chat class="chat-box-placeholder"></mdui-icon-chat>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
}

.chat-box {
  position: relative;
  flex-grow: 1;
  background-color: rgba(var(--mdui-color-surface-dim), 0.7);
}

.chat-box-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  color: rgb(var(--mdui-color-outline));
  width: 100px;
  height: 100px;
  font-size: 100px;
}
</style>
