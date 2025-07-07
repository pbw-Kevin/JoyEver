<script setup lang="ts">
import UserCard from '../components/UserCard.vue'
import MessageCount from '../components/MessageCount.vue'
import { isLoggedInStat } from '../assets/account.ts'
</script>

<template>
  <mdui-text-field label="搜索" disabled>
    <mdui-button-icon slot="end-icon" icon="search"></mdui-button-icon>
  </mdui-text-field>
  <mdui-list>
    <UserCard nickname="公告" isAnnouncement>
      <MessageCount :msgcnt="1" />
    </UserCard>
    <div class="friend-list" v-if="isLoggedInStat">
      <UserCard nickname="123123" username="123123">
        <MessageCount :msgcnt="1" />
      </UserCard>
      <UserCard nickname="456456" username="456456"> </UserCard>
      <UserCard nickname="789789" username="789789"> </UserCard>
      <UserCard nickname="lmx" username="lmx"> </UserCard>
    </div>
  </mdui-list>
  <div class="chat-disabled" v-if="!isLoggedInStat">
    <div class="chat-disabled-info">
      <mdui-icon name="warning" class="chat-disabled-icon"></mdui-icon>
      <p>登录后方可与好友聊天！</p>
    </div>
  </div>
</template>

<style scoped>
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
