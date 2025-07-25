<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopAppBar from './components/TopAppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import BackgroundImage from './components/BackgroundImage.vue'
import BottomAppBar from './components/BottomAppBar.vue'
import TopNotification from './components/TopNotification.vue'
</script>

<template>
  <BackgroundImage />
  <TopAppBar />
  <NavigationDrawer />
  <TopNotification />
  <RouterView />
  <BottomAppBar />
</template>
