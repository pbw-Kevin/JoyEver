<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { isLoggedInStat, navOpened, msgcnt } from '../assets/main.ts';

var WikiCollActive = ref(false)
</script>

<template>
  <mdui-navigation-drawer :open="navOpened" close-on-overlay-click>
    <mdui-list class="nav-drawer-list">
      <mdui-list-subheader>菜单</mdui-list-subheader>
      <RouterLink to="/">
        <mdui-list-item icon="home" rounded>首页</mdui-list-item>
      </RouterLink>
      <RouterLink to="/game">
        <mdui-list-item icon="videogame_asset" rounded>游戏</mdui-list-item>
      </RouterLink>
      <RouterLink to="/message">
        <mdui-list-item icon="message" rounded>
          消息
          <mdui-badge class="message-count" v-if="msgcnt > 0">{{ msgcnt }}</mdui-badge>
        </mdui-list-item>
      </RouterLink>
      <mdui-collapse>
        <mdui-collapse-item :active="WikiCollActive" @open="WikiCollActive = true" @close="WikiCollActive = false">
          <mdui-list-item slot="header" icon="library_books" :end-icon="'keyboard_arrow_' + ( WikiCollActive ? 'up' : 'down' )" rounded>大典</mdui-list-item>
          <div style="margin-left: 2.5rem">
            <RouterLink to="/wiki/online">
              <mdui-list-item rounded>在线大典</mdui-list-item>
            </RouterLink>
          </div>
          <div style="margin-left: 2.5rem">
            <RouterLink to="/wiki/docx">
              <mdui-list-item rounded>大典Docx</mdui-list-item>
            </RouterLink>
          </div>
          <div style="margin-left: 2.5rem">
            <RouterLink to="/wiki/test">
              <mdui-list-item rounded>试验</mdui-list-item>
            </RouterLink>
          </div>
        </mdui-collapse-item>
      </mdui-collapse>
      <RouterLink to="/myaccount" v-if="isLoggedInStat">
        <mdui-list-item icon="person" rounded>账号</mdui-list-item>
      </RouterLink>
      <RouterLink to="/changelog">
        <mdui-list-item icon="assignment" rounded>更新日志</mdui-list-item>
      </RouterLink>
      <RouterLink to="/about">
        <mdui-list-item icon="info" rounded>关于</mdui-list-item>
      </RouterLink>
    </mdui-list>
  </mdui-navigation-drawer>
</template>
