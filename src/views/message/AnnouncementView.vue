<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

import '@mdui/icons/arrow-back'
import '@mdui/icons/keyboard-arrow-down'

import MessageChatList from '@/components/message/MessageChatList.vue'
import AnnouncementPiece from '@/components/message/AnnouncementPiece.vue'
import { localInfo, AnnouncementList, updateAnnouncement } from '@/assets/announcement'
import { GotoBottom } from '@/assets/message'
import { chatContainerHeight } from '@/assets/height'
import { isDesktop } from '@/assets/appearance'

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
    <h1>{{ $t('message.title') }}</h1>
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
          <mdui-top-app-bar-title> {{ $t('announcement.title') }} </mdui-top-app-bar-title>
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
            {{ $t('announcement.new.title') }}
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
          <p v-if="AnnouncementList.length == 0" class="no-announcement">
            {{ $t('announcement.no.title') }}
          </p>
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
  user-select: none;
  --webkit-user-select: none;
}

.new-announcement {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  color: rgb(var(--mdui-color-on-surface-variant));
  line-height: 30px;
  user-select: none;
  --webkit-user-select: none;
}
</style>
