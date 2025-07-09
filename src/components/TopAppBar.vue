<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import '@mdui/icons/menu.js'
import '@mdui/icons/person.js'
import '@mdui/icons/logout.js'
import '@mdui/icons/login.js'
import '@mdui/icons/person-add.js'

import { msgcnt } from '../assets/message.ts'
import { navOpened } from '../assets/navDrawer.ts'
import { isLoggedInStat } from '../assets/account.ts'
import { getAppearance } from '../assets/appearance.ts'
import MessageCount from './MessageCount.vue'

var appearanceSettings = getAppearance()
var room = ref('1234')
</script>

<template>
  <mdui-top-app-bar
    scroll-behavior="elevate"
    :class="{ withBgImg: appearanceSettings.backgroundImage }"
  >
    <mdui-button-icon @click="navOpened = !navOpened">
      <mdui-icon-menu></mdui-icon-menu>
    </mdui-button-icon>
    <mdui-top-app-bar-title>
      <RouterLink to="/" class="title">永乐大典</RouterLink>
      <RouterLink to="/message" class="title" v-if="msgcnt > 0">
        <span class="small-title">消息</span>
        <MessageCount :msgcnt />
      </RouterLink>
      <RouterLink :to="'/room/' + room" class="title small-title" v-if="room === '1234'"
        >房间：{{ room }}</RouterLink
      >
    </mdui-top-app-bar-title>
    <div v-if="isLoggedInStat">
      <RouterLink to="/myaccount">
        <mdui-tooltip content="账号">
          <mdui-button-icon>
            <mdui-icon-person></mdui-icon-person>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
      <RouterLink to="/logout">
        <mdui-tooltip content="登出">
          <mdui-button-icon>
            <mdui-icon-logout></mdui-icon-logout>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/login">
        <mdui-tooltip content="登录">
          <mdui-button-icon>
            <mdui-icon-login></mdui-icon-login>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
      <RouterLink to="/register">
        <mdui-tooltip content="注册">
          <mdui-button-icon>
            <mdui-icon-person-add></mdui-icon-person-add>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
    </div>
  </mdui-top-app-bar>
</template>

<style scoped>
.title {
  color: rgb(var(--mdui-color-on-surface));
  font-size: var(--mdui-typescale-title-large-size);
  height: var(--mdui-typescale-title-large-size);
  margin: 0px 16px 0px 8px;
}

.small-title {
  font-size: 84%;
  height: 84%;
}

mdui-top-app-bar.withBgImg {
  opacity: 0.7;
  transition: 0.5s;
}

mdui-top-app-bar.withBgImg:hover {
  opacity: 1;
}
</style>
