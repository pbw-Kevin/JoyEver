<script setup lang="ts">
import MessageChatList from '../components/MessageChatList.vue'
import { chatContainerHeight } from '../assets/height.ts'
import { isDesktop } from '../assets/appearance.ts'
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container" :style="{ height: chatContainerHeight + 'px' }">
      <div class="chat-list" :style="{ width: isDesktop ? '250px' : '100%' }" v-if="isDesktop">
        <MessageChatList></MessageChatList>
      </div>
      <div class="chat-box">
        <mdui-top-app-bar scroll-target=".chat-box">
          <RouterLink to="/message">
            <mdui-button-icon icon="arrow_back" />
          </RouterLink>
          <mdui-top-app-bar-title> 公告 </mdui-top-app-bar-title>
        </mdui-top-app-bar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
}

.chat-list {
  display: flex;
  flex-direction: column;
  overflow: overlay;
  background-color: rgba(var(--mdui-color-background), 0.7);
}

.chat-box {
  position: relative;
  overflow: hidden;
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

.chat-disabled {
  min-height: 150px;
  flex-grow: 1;
  position: relative;
  color: rgb(var(--mdui-color-outline));
  background-color: rgba(var(--mdui-color-surface-dim), 0.7);
  text-align: center;
}

.chat-disabled-info {
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.chat-disabled-icon {
  width: 100px;
  height: 100px;
  font-size: 100px;
}
</style>
