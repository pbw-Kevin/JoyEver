<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { msgcnt } from '../assets/main.ts';
import { navOpened } from '../assets/navDrawer.ts';
import { isLoggedInStat } from '../assets/account.ts';
import { getAppearance } from '../assets/appearance.ts';

var appearanceSettings = getAppearance();
var room = ref("1234")
</script>

<template>
  <mdui-top-app-bar scroll-behavior="elevate" :class="{withBgImg: appearanceSettings.backgroundImage}">
    <mdui-button-icon icon="menu" @click="navOpened = !navOpened"></mdui-button-icon>
    <mdui-top-app-bar-title>
      <RouterLink to="/" class="title">永乐大典</RouterLink>
      <RouterLink to="/message" class="title" v-if="msgcnt > 0">
        <span class="small-title">消息</span>
        <mdui-badge class="message-count">{{ msgcnt }}</mdui-badge>
      </RouterLink>
      <RouterLink :to="'/room/' + room" class="title small-title" v-if="room === '1234'">房间：{{ room }}</RouterLink>
    </mdui-top-app-bar-title>
    <div v-if="isLoggedInStat">
      <RouterLink to="/myaccount">
        <mdui-tooltip content="账号">
          <mdui-button-icon icon="person"></mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
      <RouterLink to="/logout">
        <mdui-tooltip content="登出">
          <mdui-button-icon icon="logout"></mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/login">
        <mdui-tooltip content="登录">
          <mdui-button-icon icon="login"></mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
      <RouterLink to="/register">
        <mdui-tooltip content="注册">
          <mdui-button-icon icon="person_add"></mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
    </div>
  </mdui-top-app-bar>
</template>

<style scoped>
mdui-top-app-bar.withBgImg {
  opacity: 0.7;
  transition: 0.5s;
}

mdui-top-app-bar.withBgImg:hover {
  opacity: 1;
}
</style>
