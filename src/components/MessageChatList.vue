<script setup lang="ts">
import '@mdui/icons/search.js'
import '@mdui/icons/warning.js'

import UserCard from '../components/UserCard.vue'
import MessageCount from '../components/MessageCount.vue'
import { announcementMsgcnt, chatList } from '../assets/message.ts'
import type { MessageChatListType } from '../assets/message.ts'
import { isLoggedInStat } from '../assets/account.ts'

const prop = defineProps<{
  list?: MessageChatListType
}>()
</script>

<template>
  <div class="chat-list">
    <mdui-text-field label="搜索" disabled>
      <mdui-button-icon slot="end-icon">
        <mdui-icon-search></mdui-icon-search>
      </mdui-button-icon>
    </mdui-text-field>
    <div class="chat-list-body">
      <mdui-list>
        <UserCard nickname="公告" isAnnouncement :active="$route.name == 'Announcement'">
          <MessageCount :msgcnt="announcementMsgcnt" />
        </UserCard>
        <mdui-divider></mdui-divider>
        <div class="friend-list" v-if="isLoggedInStat">
          <UserCard
            v-for="item in prop.list || chatList"
            :username="item.username"
            :nickname="item.nickname || item.username"
            :active="$route.params.id == item.username"
          >
            <MessageCount :msgcnt="item.msgcnt" />
          </UserCard>
        </div>
      </mdui-list>
      <div class="chat-disabled" v-if="!isLoggedInStat">
        <div class="chat-disabled-info">
          <mdui-icon-warning class="chat-disabled-icon"></mdui-icon-warning>
          <p>登录后方可与好友聊天！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-list {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: overlay;
  background-color: rgba(var(--mdui-color-background), 0.7);
}

.chat-list-body {
  margin-top: 56px;
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  overflow: overlay;
  background-color: rgba(var(--mdui-color-background), 0.7);
}

mdui-text-field {
  position: absolute;
  top: 0;
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
