<script setup lang="ts">
import UserCard from '../components/UserCard.vue'
import MessageCount from '../components/MessageCount.vue'
import { chatContainerHeight } from '../assets/height.ts'
import { isDesktop } from '../assets/appearance.ts' 
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container" :style="{ height: chatContainerHeight + 'px' }">
      <div class="chat-list" :style="{ width: isDesktop ? '250px' : '100%'}" v-if="isDesktop">
        <mdui-text-field label="搜索" disabled>
          <mdui-button-icon slot="end-icon" icon="search"></mdui-button-icon>
        </mdui-text-field>
        <mdui-list>
          <UserCard nickname="公告" isAnnouncement >
            <MessageCount :msgcnt=1 />
          </UserCard>
        </mdui-list>
        <div class="chat-disabled">
          <div class="chat-disabled-info">
            <mdui-icon name="warning" class="chat-disabled-icon"></mdui-icon>
            <p>登录后方可与好友聊天！</p>
          </div>
        </div>
      </div>
      <div class="chat-box">
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
