<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { requireLogin, getUser, userRolesQuery, userInfoQuery } from '../assets/account.ts'
import UserAvatar from '../components/UserAvatar.vue'
import UserTagPack from '../components/UserTagPack.vue'

requireLogin()

var roles = ref([] as string[])
var email = ref(getUser().get('email') || '')
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

userInfoQuery.equalTo('username', getUser().get('username'))
userRolesQuery.equalTo('username', getUser().get('username'))
userInfoQuery.find().then(
  (users) => {
    if (users.length == 1) {
      userInfo.value = users[0].toJSON()
    }
  },
  (error) => {},
)
userRolesQuery.find().then((roleses) => {
  if (roleses.length == 1) {
    roles.value = roleses[0].get('roles')
  }
})
</script>

<template>
  <div class="content">
    <h1>我的账号</h1>
    <div class="user-head">
      <UserAvatar class="user-avatar" :url="userInfo.avatarURL" />
      <div class="user-head-info">
        <span class="user-head-nickname">
          AIR-Kevin
          <UserTagPack :roles></UserTagPack>
        </span>
        <br />
        <span class="user-head-username">Kevin_pbw</span>
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
      <RouterLink :to="`/account/Kevin_pbw`">
        <mdui-button>访客视角</mdui-button>
      </RouterLink>
      <RouterLink to="/history">
        <mdui-button>历史对局</mdui-button>
      </RouterLink>
      <br />
      <RouterLink to="/setting">
        <mdui-button>账号设置</mdui-button>
      </RouterLink>
      <RouterLink to="/logout">
        <mdui-button>登出账号</mdui-button>
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
