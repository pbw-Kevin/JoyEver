<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { isLoggedInStat, navOpened, msgcnt } from '../assets/main.ts';

var room = ref("1234")
</script>

<template>
  <mdui-top-app-bar scroll-behavior="elevate">
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
        <mdui-button-icon icon="person"></mdui-button-icon>
      </RouterLink>
      <RouterLink to="/logout">
        <mdui-button-icon icon="logout"></mdui-button-icon>
      </RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/login">
        <mdui-button-icon icon="login"></mdui-button-icon>
      </RouterLink>
      <RouterLink to="/register">
        <mdui-button-icon icon="person_add"></mdui-button-icon>
      </RouterLink>
    </div>
  </mdui-top-app-bar>
</template>