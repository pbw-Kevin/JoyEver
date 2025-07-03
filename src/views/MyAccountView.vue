<script setup lang="ts">
import { isLoggedIn } from '../assets/account.ts'
import { sendNoti } from '../assets/notifications.ts'
import { useRouter } from 'vue-router'
import UserAvatar from '../components/UserAvatar.vue'
import UserTag from '../components/UserTag.vue'

const router = useRouter()

if (!isLoggedIn()) {
  sendNoti('请先登录！')
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="content">
    <h1>我的账号</h1>
    <div class="user-head">
      <UserAvatar class="user-avatar" url="" />
      <div class="user-head-info">
        <span class="user-head-nickname">
          123
          <UserTag tag="用户" />
          <UserTag tag="管理员" color="purple" />
          <UserTag tag="超级管理员" color="green" />
          <UserTag tag="站长" color="aqua" />
          <UserTag tag="已封禁" color="brown" /> </span
        ><br />
        <span class="user-head-username"> 123 </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-head {
  height: 100px;
  display: flex;
}

.user-avatar {
  font-size: 100px;
  height: 100px;
  width: 100px;
}

.user-head-info {
  margin-top: 10px;
  margin-left: 10px;
}

.user-head-nickname {
  font-weight: bold;
  font-size: 30px;
}

.user-head-username {
  font-size: 20px;
}

.user-head-username::before {
  content: '@';
}
</style>
