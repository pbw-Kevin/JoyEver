<script setup lang="ts">
import { useRoute } from 'vue-router'
import { isLoggedIn, getUser, userRolesQuery, getUserInfo, getEmail } from '../assets/account.ts'
import UserAvatar from '../components/UserAvatar.vue'
import UserTagPack from '../components/UserTagPack.vue'
import { ref, type Ref } from 'vue'

var route = useRoute()

var username = route.params.id

var isMe = isLoggedIn() && getUser().get('username') == username
var isNotMe = isLoggedIn() && getUser().get('username') != username

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
getUserInfo(true, username as string).then((tmpUserInfo) => {
  userInfo.value = tmpUserInfo.toJSON()
  getEmail(true, username as string).then((tmpEmailInfo) => {
    if (tmpEmailInfo.getACL()?.getPublicReadAccess()) email.value = tmpEmailInfo.get('email')
  })
  userRolesQuery.equalTo('username', username)
  userRolesQuery.find().then((roleses) => {
    if (roleses.length == 1) {
      roles.value = roleses[0].get('roles')
    }
  })
})
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
      <mdui-button v-if="isNotMe" disabled>添加好友</mdui-button>
      <RouterLink to="/myaccount" v-if="isMe">
        <mdui-button>个人视角</mdui-button>
      </RouterLink>
      <RouterLink :to="`/history/${username}`" v-if="false">
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

mdui-text-field {
  margin: 10px 0;
}
</style>
