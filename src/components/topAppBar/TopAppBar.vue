<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import '@mdui/icons/menu'
import '@mdui/icons/person'
import '@mdui/icons/logout'
import '@mdui/icons/login'
import '@mdui/icons/person-add'
import '@mdui/icons/translate'

import { msgcnt } from '@/assets/message'
import { navOpened } from '@/assets/navDrawer'
import { isLoggedInStat } from '@/assets/account'
import { backgroundImageLoaded } from '@/assets/appearance'
import MessageCount from '../message/MessageCount.vue'
import { currentLanguage } from '@/assets/lang'

var room = ref('')
</script>

<template>
  <mdui-top-app-bar scroll-behavior="elevate" :class="{ withBgImg: backgroundImageLoaded }">
    <mdui-button-icon @click="navOpened = !navOpened">
      <mdui-icon-menu></mdui-icon-menu>
    </mdui-button-icon>
    <mdui-top-app-bar-title>
      <RouterLink to="/" class="title">{{ $t('site.title') }}</RouterLink>
      <RouterLink to="/message" class="title" v-if="msgcnt > 0">
        <span class="small-title">{{ $t('message.title') }}</span>
        <MessageCount :msgcnt />
      </RouterLink>
      <RouterLink :to="'/room/' + room" class="title" v-if="room">
        <span class="small-title">{{ $t('game.room.titleInTopAppBar', { room }) }}</span>
      </RouterLink>
    </mdui-top-app-bar-title>
    <mdui-dropdown>
      <mdui-button-icon slot="trigger">
        <mdui-tooltip :content="$t('lang.title')">
          <mdui-icon-translate></mdui-icon-translate>
        </mdui-tooltip>
      </mdui-button-icon>
      <!-- An unexpected fault happens here:( -->
      <mdui-menu
        selects="single"
        :value="currentLanguage"
        @change="currentLanguage = $event.target.value"
      >
        <mdui-menu-item value="zh-CN">简体中文</mdui-menu-item>
        <mdui-menu-item value="en-US">English (US)</mdui-menu-item>
        <mdui-menu-item value="follow-system">{{ $t('lang.followSystem') }}</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
    <div v-if="isLoggedInStat">
      <RouterLink to="/myaccount">
        <mdui-tooltip :content="$t('account.title')">
          <mdui-button-icon>
            <mdui-icon-person></mdui-icon-person>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
      <RouterLink to="/logout">
        <mdui-tooltip :content="$t('account.operation.logout')">
          <mdui-button-icon>
            <mdui-icon-logout></mdui-icon-logout>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/login">
        <mdui-tooltip :content="$t('account.operation.login')">
          <mdui-button-icon>
            <mdui-icon-login></mdui-icon-login>
          </mdui-button-icon>
        </mdui-tooltip>
      </RouterLink>
      <RouterLink to="/register">
        <mdui-tooltip :content="$t('account.operation.register')">
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
  opacity: var(--sidebar-opacity, 0.7);
  transition: 0.5s;
}

mdui-top-app-bar.withBgImg:hover {
  opacity: 1;
}
</style>
