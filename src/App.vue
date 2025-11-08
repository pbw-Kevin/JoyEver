<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopAppBar from './components/topAppBar/TopAppBar.vue'
import NavigationDrawer from './components/navigationDrawer/NavigationDrawer.vue'
import BackgroundImage from './components/backgroundImage/BackgroundImage.vue'
import BottomAppBar from './components/bottomAppBar/BottomAppBar.vue'
import TopNotification from './components/topNotification/TopNotification.vue'
</script>

<template>
  <BackgroundImage />
  <TopAppBar />
  <NavigationDrawer />
  <TopNotification />
  <RouterView />
  <BottomAppBar />
</template>
