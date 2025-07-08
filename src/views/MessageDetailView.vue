<script setup lang="ts">
import MessageChatList from '../components/MessageChatList.vue'
import MessagePiece from '../components/MessagePiece.vue'
import { requireLogin } from '../assets/account.ts'
import { chatContainerHeight } from '../assets/height.ts'
import { isDesktop } from '../assets/appearance.ts'
import { messageList } from '../assets/message.ts'

requireLogin()
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container" :style="{ height: chatContainerHeight + 'px' }">
      <div class="chat-list" :style="{ width: isDesktop ? '250px' : '100%', minWidth: isDesktop ? '250px' : '100%' }" v-if="isDesktop">
        <MessageChatList></MessageChatList>
      </div>
      <div class="chat-box">
        <mdui-top-app-bar scroll-target=".chat-box">
          <RouterLink to="/message">
            <mdui-button-icon icon="arrow_back" />
          </RouterLink>
          <mdui-top-app-bar-title> 聊天：{{ $route.params.id }} </mdui-top-app-bar-title>
          <mdui-button-icon icon="more_vert"></mdui-button-icon>
        </mdui-top-app-bar>
        <div class="chat-message-container">
          <MessagePiece
            v-for="message in messageList"
            :alignment="message.me? 'right' : 'left'"
            :nickname="message.nickname"
            :backgroundColor="message.me ? 'rgb(var(--mdui-color-secondary-container))' : 'rgb(var(--mdui-color-surface-container-low)'"
          >{{ message.messageType == 'text' ? message.text : '' }}</MessagePiece>
        </div>
        <mdui-text-field placeholder="发送消息" autosize max-rows="3">
          <mdui-button-icon slot="end-icon" icon="send"></mdui-button-icon>
        </mdui-text-field>
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
  overflow: hidden;
  background-color: rgba(var(--mdui-color-surface-dim), 0.7);
}

.chat-message-container {
  height: calc(100% - 64px);
  max-width: 100%;
  overflow: overlay;
  margin-bottom: 64px;
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

mdui-text-field {
  position: absolute;
  bottom: 0;
}
</style>
