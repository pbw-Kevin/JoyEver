<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopAppBar from './components/TopAppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import BackgroundImage from './components/BackgroundImage.vue'
import BottomAppBar from './components/BottomAppBar.vue'
import 'mdui/mdui.css'
import 'mdui'
import { fetchAppearance } from './assets/appearance.ts'

fetchAppearance()
</script>

<template>
  <BackgroundImage />
  <TopAppBar />
  <NavigationDrawer />
  <RouterView />
  <BottomAppBar />
</template>
