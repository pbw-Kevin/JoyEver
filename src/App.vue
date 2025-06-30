<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TopAppBar from './components/TopAppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import 'mdui/mdui.css'
import 'mdui'
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

setColorScheme('#ff0000')
</script>

<template>
  <TopAppBar />
  <NavigationDrawer />
  <RouterView />
</template>

<style>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>
