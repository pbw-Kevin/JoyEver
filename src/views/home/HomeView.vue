<script setup lang="ts">
import { isLoggedInStat } from '@/assets/account'
</script>

<template>
  <div class="content">
    <h1>{{ $t('home.title') }}</h1>
    {{ $t('home.disc') }}<br />
    {{ $t('home.options.title') }}<br />
    <ul>
      <li>
        {{ $t('home.options.startGame.pre')
        }}<RouterLink to="/game">{{ $t('home.options.startGame.title') }}</RouterLink
        >{{ $t('home.options.startGame.suf') }}
      </li>
      <li>
        {{ $t('home.options.viewWiki.pre')
        }}<RouterLink to="/wiki/online">{{ $t('home.options.viewWiki.title') }}</RouterLink
        >{{ $t('home.options.viewWiki.suf') }}
      </li>
      <li v-if="!isLoggedInStat">
        <RouterLink to="/login">{{ $t('home.options.login.title') }}</RouterLink
        ><br />
        {{ $t('home.options.login.disc') }}
      </li>
    </ul>
  </div>
</template>
