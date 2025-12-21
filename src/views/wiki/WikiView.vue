<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="content">
    <h1>{{ $t('wiki.title') }}</h1>
    <div>
      <p>{{ $t('wiki.home.title') }}</p>
      <ul>
        <li>
          <RouterLink to="/wiki/online">{{ $t('wiki.online.title') }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/wiki/online">{{ $t('wiki.docx.title') }}</RouterLink>
        </li>
      </ul>
      <p>
        {{ $t('wiki.home.test.pre')
        }}<RouterLink to="/wiki/test">{{ $t('wiki.test.title') }}</RouterLink
        >{{ $t('wiki.home.test.suf') }}
      </p>
    </div>
  </div>
</template>
