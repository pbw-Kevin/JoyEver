<script setup lang="ts">
import '@mdui/icons/arrow-back.js'
import '@mdui/icons/more-vert.js'
import '@mdui/icons/send.js'

import { onMounted, onUpdated } from 'vue'
import MessageChatList from '../components/MessageChatList.vue'
import MessagePiece from '../components/MessagePiece.vue'
import { requireLogin } from '../assets/account.ts'
import { chatContainerHeight } from '../assets/height.ts'
import { isDesktop } from '../assets/appearance.ts'
import { messageList, GotoBottom } from '../assets/message.ts'

requireLogin()
onMounted(() => setTimeout(GotoBottom, 0, '.chat-message-container'))
onUpdated(() => GotoBottom('.chat-message-container')) // Too brute actions
</script>

<template>
  <div class="content">
    <h1>站内消息</h1>
    <div class="chat-container" :style="{ height: chatContainerHeight + 'px' }">
      <MessageChatList
        :style="{ width: isDesktop ? '250px' : '100%', minWidth: isDesktop ? '250px' : '100%' }"
        v-if="isDesktop"
      ></MessageChatList>
      <div class="chat-box">
        <mdui-top-app-bar scroll-target=".chat-message-container">
          <RouterLink to="/message">
            <mdui-button-icon>
              <mdui-icon-arrow-back></mdui-icon-arrow-back>
            </mdui-button-icon>
          </RouterLink>
          <mdui-top-app-bar-title> 聊天：{{ $route.params.id }} </mdui-top-app-bar-title>
          <mdui-button-icon>
            <mdui-icon-more-vert></mdui-icon-more-vert>
          </mdui-button-icon>
        </mdui-top-app-bar>
        <div class="chat-message-container">
          <MessagePiece
            v-for="message in messageList"
            :alignment="message.me ? 'right' : 'left'"
            :nickname="message.nickname"
            :time="message.time"
            :backgroundColor="
              message.me
                ? 'rgb(var(--mdui-color-secondary-container))'
                : 'rgb(var(--mdui-color-surface-container-low)'
            "
          >
            <p v-for="para in message.text.split('\n')" v-if="message.messageType == 'text'">
              {{ para }}
            </p>
          </MessagePiece>
          <p v-if="messageList.length == 0" class="no-message">暂无消息</p>
        </div>
        <mdui-text-field placeholder="发送消息" autosize max-rows="3">
          <mdui-button-icon slot="end-icon">
            <mdui-icon-send></mdui-icon-send>
          </mdui-button-icon>
        </mdui-text-field>
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  background-color: rgba(var(--mdui-color-surface-dim), 0.7);
}

.chat-message-container {
  flex-grow: 1;
  width: 100%;
  overflow: overlay;
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

p {
  margin: 0;
}

.no-message {
  margin-top: 10px;
  font-size: 24px;
  color: rgb(var(--mdui-color-on-surface-variant));
  text-align: center;
}
</style>
