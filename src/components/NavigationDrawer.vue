<script setup lang="ts">
import { ref } from 'vue'

import '@mdui/icons/home.js'
import '@mdui/icons/videogame-asset.js'
import '@mdui/icons/message.js'
import '@mdui/icons/library-books.js'
import '@mdui/icons/keyboard-arrow-up.js'
import '@mdui/icons/keyboard-arrow-down.js'
import '@mdui/icons/person.js'
import '@mdui/icons/contact-support.js'
import '@mdui/icons/assignment.js'
import '@mdui/icons/info.js'

import { msgcnt } from '../assets/message.ts'
import { navOpened, UpdateNavOpened } from '../assets/navDrawer.ts'
import { isLoggedInStat } from '../assets/account.ts'
import { backgroundImageLoaded, isDesktop } from '../assets/appearance.ts'
import NavigationDrawerItem from './NavigationDrawerItem.vue'
import MessageCount from './MessageCount.vue'

var WikiCollActive = ref(false)

UpdateNavOpened()
</script>

<template>
  <mdui-navigation-drawer
    :open="navOpened"
    close-on-overlay-click
    :class="{ withBgImg: backgroundImageLoaded }"
  >
    <mdui-list class="nav-drawer-list" :style="{ 'margin-bottom': isDesktop ? '80px' : '' }">
      <mdui-list-subheader>{{ isDesktop ? '' : '菜单' }}</mdui-list-subheader>
      <NavigationDrawerItem to="/" :belonged-routes="['Home']">
        <mdui-icon-home slot="icon"></mdui-icon-home>
        首页
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/game" :belonged-routes="['GameHome', 'RoomList', 'Room']">
        <mdui-icon-videogame-asset slot="icon"></mdui-icon-videogame-asset>
        游戏
      </NavigationDrawerItem>
      <NavigationDrawerItem
        to="/message"
        :belonged-routes="['Message', 'MessageDetail', 'Announcement']"
      >
        <mdui-icon-message slot="icon"></mdui-icon-message>
        消息
        <MessageCount :msgcnt />
      </NavigationDrawerItem>
      <mdui-collapse>
        <mdui-collapse-item
          :active="WikiCollActive"
          @open="WikiCollActive = true"
          @close="WikiCollActive = false"
        >
          <NavigationDrawerItem slot="header" :belonged-routes="['Wiki']">
            <mdui-icon-library-books slot="icon"></mdui-icon-library-books>
            大典
            <mdui-icon-keyboard-arrow-up
              slot="end-icon"
              v-if="WikiCollActive"
            ></mdui-icon-keyboard-arrow-up>
            <mdui-icon-keyboard-arrow-down slot="end-icon" v-else></mdui-icon-keyboard-arrow-down>
          </NavigationDrawerItem>
          <div style="margin-left: 2.5rem">
            <NavigationDrawerItem to="/wiki/online" :belonged-routes="['OnlineWiki']">
              在线大典
            </NavigationDrawerItem>
          </div>
          <div style="margin-left: 2.5rem">
            <NavigationDrawerItem to="/wiki/docx" :belonged-routes="['DocxWiki']">
              大典Docx
            </NavigationDrawerItem>
          </div>
          <div style="margin-left: 2.5rem">
            <NavigationDrawerItem to="/wiki/test" :belonged-routes="['Test']">
              试验
            </NavigationDrawerItem>
          </div>
        </mdui-collapse-item>
      </mdui-collapse>
      <NavigationDrawerItem
        to="/myaccount"
        :belonged-routes="['MyAccount', 'Setting']"
        v-if="isLoggedInStat"
      >
        <mdui-icon-person slot="icon"></mdui-icon-person>
        账号
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/ticket" :belonged-routes="['Ticket', 'MyTicket']">
        <mdui-icon-contact-support slot="icon"></mdui-icon-contact-support>
        工单
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/changelog" :belonged-routes="['Changelog']">
        <mdui-icon-assignment slot="icon"></mdui-icon-assignment>
        更新日志
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/about" :belonged-routes="['About']">
        <mdui-icon-info slot="icon"></mdui-icon-info>
        关于
      </NavigationDrawerItem>
    </mdui-list>
  </mdui-navigation-drawer>
</template>

<style scoped>
mdui-list.nav-drawer-list {
  margin: 0px 12px 0px 12px;
}

mdui-navigation-drawer {
  box-shadow: var(--mdui-elevation-level3);
}

@media (min-width: 840px) {
  mdui-navigation-drawer.withBgImg {
    opacity: var(--sidebar-opacity, 0.7);
    transition: 0.5s;
  }

  mdui-navigation-drawer.withBgImg:hover {
    opacity: 1;
  }
}
</style>
