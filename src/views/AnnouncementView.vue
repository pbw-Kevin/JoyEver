<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

import '@mdui/icons/arrow-back.js'
import '@mdui/icons/keyboard-arrow-down.js'

import MessageChatList from '../components/MessageChatList.vue'
import AnnouncementPiece from '../components/AnnouncementPiece.vue'
import { localInfo, AnnouncementList, updateAnnouncement } from '../assets/announcement.ts'
import { GotoBottom } from '../assets/message.ts'
import { chatContainerHeight } from '../assets/height.ts'
import { isDesktop } from '../assets/appearance.ts'

var lastTime = ref(localInfo.value)

onMounted(() => {
  lastTime.value = localInfo.value
  setTimeout(GotoBottom, 0, '.chat-announcement-container')
  updateAnnouncement(true)
})
onUpdated(() => GotoBottom('.chat-announcement-container')) // Too brute actions
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
        <mdui-top-app-bar scroll-target=".chat-box">
          <RouterLink to="/message">
            <mdui-button-icon>
              <mdui-icon-arrow-back></mdui-icon-arrow-back>
            </mdui-button-icon>
          </RouterLink>
          <mdui-top-app-bar-title> 公告 </mdui-top-app-bar-title>
        </mdui-top-app-bar>
        <div class="chat-announcement-container">
          <AnnouncementPiece
            v-for="announcement in AnnouncementList.filter((announcement) => {
              return announcement.time < lastTime
            })"
            :time="announcement.time.toLocaleString('zh-CN')"
          >
            <p v-for="para in announcement.text.split('\n')">{{ para }}</p>
          </AnnouncementPiece>
          <div
            v-if="
              AnnouncementList.filter((announcement) => {
                return announcement.time > lastTime
              }).length > 0
            "
            class="new-announcement"
          >
            新公告
            <mdui-icon-keyboard-arrow-down></mdui-icon-keyboard-arrow-down>
          </div>
          <AnnouncementPiece
            v-for="announcement in AnnouncementList.filter((announcement) => {
              return announcement.time > lastTime
            })"
            :time="announcement.time.toLocaleString('zh-CN')"
          >
            <p v-for="para in announcement.text.split('\n')">{{ para }}</p>
          </AnnouncementPiece>
          <p v-if="AnnouncementList.length == 0" class="no-announcement">暂无公告</p>
        </div>
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
  overflow: overlay;
  background-color: rgba(var(--mdui-color-surface-dim), 0.7);
}

.chat-announcement-container {
  flex-grow: 1;
  width: 100%;
  overflow: overlay;
}

p {
  margin: 0;
}

.no-announcement {
  margin-top: 10px;
  font-size: 30px;
  color: rgb(var(--mdui-color-on-surface-variant));
  text-align: center;
}

.new-announcement {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  color: rgb(var(--mdui-color-on-surface-variant));
  line-height: 30px;
}
</style>
