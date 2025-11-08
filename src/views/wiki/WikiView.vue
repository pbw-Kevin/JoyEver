<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="content">
    <h1>大典Wiki</h1>
    <div>
      <p>你可以访问：</p>
      <ul>
        <li>
          <RouterLink to="/wiki/online">在线大典</RouterLink>
        </li>
        <li>
          <RouterLink to="/wiki/online">大典Docx</RouterLink>
        </li>
      </ul>
      <p>大典不能解决的困惑，可以在<RouterLink to="/wiki/test">在线试验</RouterLink>中自行尝试。</p>
    </div>
  </div>
</template>
