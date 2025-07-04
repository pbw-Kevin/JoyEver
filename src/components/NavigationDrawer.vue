<script setup lang="ts">
import { ref } from 'vue'
import { msgcnt } from '../assets/message.ts'
import { navOpened, UpdateNavOpened } from '../assets/navDrawer.ts'
import { isLoggedInStat } from '../assets/account.ts'
import { getAppearance, isDesktop } from '../assets/appearance.ts'
import NavigationDrawerItem from './NavigationDrawerItem.vue'
import MessageCount from './MessageCount.vue'

var appearanceSettings = getAppearance()
var WikiCollActive = ref(false)

UpdateNavOpened()
</script>

<template>
  <mdui-navigation-drawer
    :open="navOpened"
    close-on-overlay-click
    :class="{ withBgImg: appearanceSettings.backgroundImage }"
  >
    <mdui-list class="nav-drawer-list" :style="{ 'margin-bottom': isDesktop ? '80px' : '' }">
      <mdui-list-subheader>{{ isDesktop ? '' : '菜单' }}</mdui-list-subheader>
      <NavigationDrawerItem to="/" :belonged-routes="['Home']" icon="home">
        首页
      </NavigationDrawerItem>
      <NavigationDrawerItem
        to="/game"
        :belonged-routes="['GameHome', 'RoomList', 'Room']"
        icon="videogame_asset"
      >
        游戏
      </NavigationDrawerItem>
      <NavigationDrawerItem
        to="/message"
        :belonged-routes="['Message', 'MessageDetail', 'Announcement']"
        icon="message"
      >
        消息
        <MessageCount :msgcnt />
      </NavigationDrawerItem>
      <mdui-collapse>
        <mdui-collapse-item
          :active="WikiCollActive"
          @open="WikiCollActive = true"
          @close="WikiCollActive = false"
        >
          <mdui-list-item
            slot="header"
            icon="library_books"
            :end-icon="'keyboard_arrow_' + (WikiCollActive ? 'up' : 'down')"
            rounded
            >大典</mdui-list-item
          >
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
        :belonged-routes="['MyAccount']"
        icon="person"
        v-if="isLoggedInStat"
      >
        账号
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/changelog" :belonged-routes="['Changelog']" icon="assignment">
        更新日志
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/about" :belonged-routes="['About']" icon="info">
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
    opacity: 0.7;
    transition: 0.5s;
  }

  mdui-navigation-drawer.withBgImg:hover {
    opacity: 1;
  }
}
</style>
