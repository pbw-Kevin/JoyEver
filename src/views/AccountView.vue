<script setup lang="ts">
import { useRoute } from 'vue-router'
import { isLoggedIn, getUser, userInfoQuery, emailQuery } from '../assets/account.ts'
import { sendNoti } from '@/assets/notifications.ts'
import UserAvatar from '../components/UserAvatar.vue'
import UserTag from '../components/UserTag.vue'
import { ref, type Ref } from 'vue'

var route = useRoute()

var username = route.params.id

var isMe = isLoggedIn() && getUser().get('username') == username
var isNotMe = isLoggedIn() && getUser().get('username') != username

userInfoQuery.equalTo('username', username)
var userInfo: Ref<{
  objectId: string
  avatarURL?: string
  belongsTo?: string
  nickname: string
  ownedAccunts?: string[]
  userId: string
  username: string
  createdAt: string
  updatedAt: string
}> = ref({
  objectId: '',
  nickname: '',
  userId: '',
  username: '',
  createdAt: '',
  updatedAt: '',
})
var email = ref('')
userInfoQuery.find().then(
  (users) => {
    if (users.length > 1) sendNoti('该用户异常', true)
    else if (users.length == 0) sendNoti('该用户不存在', true)
    else {
      userInfo.value = users[0].toJSON()
      emailQuery.equalTo('userId', userInfo.value.userId)
      emailQuery.find().then((emails) => {
        if (emails.length == 1) {
          email.value = emails[0].get('email')
        }
      })
    }
  },
  (error) => {
    sendNoti('获取用户失败', true)
  },
)
</script>

<template>
  <div class="content">
    <h1>账号</h1>
    <div class="user-head">
      <UserAvatar class="user-avatar" :url="userInfo.avatarURL" />
      <div class="user-head-info">
        <span class="user-head-nickname">
          {{ userInfo.nickname }}
          <UserTag tag="用户" />
          <UserTag tag="管理员" color="purple" />
          <UserTag tag="超级管理员" color="green" />
          <UserTag tag="站长" color="aqua" />
          <UserTag tag="已封禁" color="brown" />
        </span>
        <br />
        <span class="user-head-username">{{ username }}</span>
      </div>
    </div>
    <div class="user-info">
      <mdui-text-field
        class="user-email"
        variant="outlined"
        readonly
        label="邮箱"
        :value="email"
        v-if="email"
      ></mdui-text-field>
      <br />
      <mdui-button v-if="isNotMe">添加好友</mdui-button>
      <RouterLink to="/myaccount" v-if="isMe">
        <mdui-button>个人视角</mdui-button>
      </RouterLink>
      <RouterLink :to="`/history/${username}`">
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
  margin-bottom: 8px;
}

mdui-button {
  margin: 4px;
}
</style>
