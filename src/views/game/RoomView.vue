<script setup lang="ts"></script>

<template>
  <div class="content">
    <h1>{{ $t('game.room.titleInTopAppBar', { room: $route.params.id }) }}</h1>
    <p>{{ $t('developing.title') }}</p>
  </div>
</template>
