<script setup lang="ts">
import { requireLogin } from '../assets/account.ts'
import UserAvatar from '../components/UserAvatar.vue'
import UserTag from '../components/UserTag.vue'

requireLogin()
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
          <UserTag tag="已封禁" color="brown" />
        </span>
        <br />
        <span class="user-head-username"> 123 </span>
      </div>
    </div>
    <div class="user-info">
      <mdui-text-field
        class="user-email"
        variant="outlined"
        readonly
        label="邮箱"
        value="kevin20110612@126.com"
      ></mdui-text-field>
      <br />
      <RouterLink to="/setting"> <mdui-button>账号设置</mdui-button> </RouterLink><br />
      <RouterLink to="/history">
        <mdui-button>历史对局</mdui-button>
      </RouterLink>
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
  color: rgb(var(--mdui-color-on-surface-variant));
}

.user-head-username::before {
  content: '@';
}

.user-email {
  margin-bottom: 6px;
}
</style>
