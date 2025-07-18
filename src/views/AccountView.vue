<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  isLoggedIn,
  getUser,
  userInfoQuery,
  emailQuery,
  userRolesQuery,
} from '../assets/account.ts'
import { sendNoti } from '@/assets/notifications.ts'
import UserAvatar from '../components/UserAvatar.vue'
import UserTagPack from '../components/UserTagPack.vue'
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
  username: string
  createdAt: string
  updatedAt: string
}> = ref({
  objectId: '',
  nickname: '',
  username: '',
  createdAt: '',
  updatedAt: '',
})
var email = ref('')
var roles = ref([] as string[])
userInfoQuery.find().then(
  (users) => {
    if (users.length > 1) sendNoti('该用户异常', true)
    else if (users.length == 0) sendNoti('该用户不存在', true)
    else {
      userInfo.value = users[0].toJSON()
      emailQuery.equalTo('username', username)
      emailQuery.find().then((emails) => {
        if (emails.length == 1) {
          email.value = emails[0].get('email')
        }
      })
      userRolesQuery.equalTo('username', username)
      userRolesQuery.find().then((roleses) => {
        if (roleses.length == 1) {
          roles.value = roleses[0].get('roles')
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
          <UserTagPack :roles></UserTagPack>
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
