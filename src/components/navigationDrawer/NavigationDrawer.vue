<script setup lang="ts">
import { ref } from 'vue'

import '@mdui/icons/home'
import '@mdui/icons/videogame-asset'
import '@mdui/icons/message'
import '@mdui/icons/library-books'
import '@mdui/icons/keyboard-arrow-up'
import '@mdui/icons/keyboard-arrow-down'
import '@mdui/icons/person'
import '@mdui/icons/admin-panel-settings'
import '@mdui/icons/contact-support'
import '@mdui/icons/assignment'
import '@mdui/icons/info'

import { msgcnt } from '@/assets/message'
import { navOpened, UpdateNavOpened, WikiCollActive } from '@/assets/navDrawer'
import { isLoggedInStat, curIsAdmin } from '@/assets/account'
import { backgroundImageLoaded, isDesktop } from '@/assets/appearance'
import NavigationDrawerItem from './NavigationDrawerItem.vue'
import MessageCount from '../message/MessageCount.vue'

UpdateNavOpened()
</script>

<template>
  <mdui-navigation-drawer
    :open="navOpened"
    @open="navOpened = true"
    @close="navOpened = false"
    close-on-overlay-click
    :class="{ withBgImg: backgroundImageLoaded }"
  >
    <mdui-list class="nav-drawer-list" :style="{ margin: isDesktop ? '50px 12px 80px 12px' : '' }">
      <mdui-list-subheader>{{ $t('menu.title') }}</mdui-list-subheader>
      <NavigationDrawerItem to="/" :belonged-routes="['Home']">
        <mdui-icon-home slot="icon"></mdui-icon-home>
        {{ $t('home.title') }}
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/game" :belonged-routes="['GameHome', 'RoomList', 'Room']">
        <mdui-icon-videogame-asset slot="icon"></mdui-icon-videogame-asset>
        {{ $t('game.title') }}
      </NavigationDrawerItem>
      <NavigationDrawerItem
        to="/message"
        :belonged-routes="['Message', 'MessageDetail', 'Announcement']"
      >
        <mdui-icon-message slot="icon"></mdui-icon-message>
        {{ $t('message.title') }}
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
            {{ $t('wiki.title') }}
            <mdui-icon-keyboard-arrow-up
              slot="end-icon"
              v-if="WikiCollActive"
            ></mdui-icon-keyboard-arrow-up>
            <mdui-icon-keyboard-arrow-down slot="end-icon" v-else></mdui-icon-keyboard-arrow-down>
          </NavigationDrawerItem>
          <div class="nav-drawer-subitem">
            <NavigationDrawerItem to="/wiki/online" :belonged-routes="['OnlineWiki']">
              {{ $t('wiki.online.title') }}
            </NavigationDrawerItem>
          </div>
          <div class="nav-drawer-subitem">
            <NavigationDrawerItem to="/wiki/docx" :belonged-routes="['DocxWiki']">
              {{ $t('wiki.docx.title') }}
            </NavigationDrawerItem>
          </div>
          <div class="nav-drawer-subitem">
            <NavigationDrawerItem to="/wiki/test" :belonged-routes="['Test']">
              {{ $t('wiki.test.title') }}
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
        {{ $t('account.title') }}
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/admin" :belonged-routes="['Admin']" v-if="curIsAdmin">
        <mdui-icon-admin-panel-settings slot="icon"></mdui-icon-admin-panel-settings>
        {{ $t('admin.title') }}
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/ticket" :belonged-routes="['Ticket', 'MyTicket']">
        <mdui-icon-contact-support slot="icon"></mdui-icon-contact-support>
        {{ $t('ticket.title') }}
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/changelog" :belonged-routes="['Changelog']">
        <mdui-icon-assignment slot="icon"></mdui-icon-assignment>
        {{ $t('changelog.title') }}
      </NavigationDrawerItem>
      <NavigationDrawerItem to="/about" :belonged-routes="['About']">
        <mdui-icon-info slot="icon"></mdui-icon-info>
        {{ $t('about.title') }}
      </NavigationDrawerItem>
    </mdui-list>
  </mdui-navigation-drawer>
</template>

<style scoped>
mdui-list.nav-drawer-list {
  margin: 0px 12px;
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

.nav-drawer-subitem {
  margin-left: 2.5rem;
}
</style>
