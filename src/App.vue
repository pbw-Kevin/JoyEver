<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopAppBar from './components/TopAppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import BackgroundImage from './components/BackgroundImage.vue'
import BottomAppBar from './components/BottomAppBar.vue'
import 'mdui/mdui.css'
import 'mdui'
import { useAppearance, getAppearance } from './assets/appearance.ts'

useAppearance()
var appearanceSettings = getAppearance()
</script>

<template>
  <BackgroundImage />
  <TopAppBar />
  <NavigationDrawer />
  <RouterView />
  <BottomAppBar />
</template>

<style>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>
