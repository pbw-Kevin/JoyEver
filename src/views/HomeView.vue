<script setup lang="ts">
import { isLoggedInStat } from '../assets/account.ts'
</script>

<template>
  <div class="content">
    <h1>首页</h1>
    欢迎来到永乐大典在线游戏！<br />
    你可以：<br />
    <ul>
      <li>立刻<RouterLink to="/game">开始游戏</RouterLink></li>
      <li>在线查看<RouterLink to="/wiki/online">永乐大典（Wiki）</RouterLink></li>
      <li v-if="!isLoggedInStat">
        <RouterLink to="/login">登录账号</RouterLink><br />
        （推荐，登录后可以查看过往对局，启用聊天功能）
      </li>
    </ul>
  </div>
</template>
