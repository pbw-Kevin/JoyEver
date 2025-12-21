<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="content">
    <h1>{{ $t('wiki.online.title') }}</h1>
    <p>
      {{ $t('developing.title') }}<br />
      可以先访问 <RouterLink to="/wiki/docx">Docx 版大典</RouterLink>。
    </p>
  </div>
</template>
