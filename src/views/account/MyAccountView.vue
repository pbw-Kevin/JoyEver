<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { curRole, requireLogin, getUser, myInfoObject } from '@/assets/account'
import UserAvatar from '@/components/account/UserAvatar.vue'
import UserTagPack from '@/components/account/UserTagPack.vue'

var user = getUser()
var email = ref('')
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

onMounted(() => {
  if (requireLogin()) return
  userInfo.value.username = user.get('username')
  if (user.get('email')) email.value = user.get('email')
  myInfoObject.get('userRoles')
  myInfoObject.get('userInfo').then((tmpUserInfo) => {
    if (tmpUserInfo) userInfo.value = tmpUserInfo.toJSON()
  })
})
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.my.title') }}</h1>
    <div class="user-head">
      <UserAvatar class="user-avatar" :url="userInfo.avatarURL" />
      <div class="user-head-info">
        <span class="user-head-nickname">
          {{ userInfo.nickname }}
          <UserTagPack :roles="curRole"></UserTagPack>
        </span>
        <br />
        <span class="user-head-username">{{ userInfo.username }}</span>
      </div>
    </div>
    <div class="user-info">
      <mdui-text-field
        class="user-email"
        variant="outlined"
        readonly
        :label="$t('account.email.title')"
        :value="email"
        v-if="email"
      ></mdui-text-field>
      <br />
      <RouterLink :to="`/account/${userInfo.username}`">
        <mdui-button>{{ $t('account.view.visitor') }}</mdui-button>
      </RouterLink>
      <RouterLink to="/history">
        <mdui-button>{{ $t('game.history.my.title') }}</mdui-button>
      </RouterLink>
      <br />
      <RouterLink to="/setting">
        <mdui-button>{{ $t('setting.title') }}</mdui-button>
      </RouterLink>
      <RouterLink to="/logout">
        <mdui-button>{{ $t('account.operation.logout') }}</mdui-button>
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
