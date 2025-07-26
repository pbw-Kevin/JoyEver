<script setup lang="ts">
import { ref } from 'vue'
import { requireLogin, getUser, getUserInfo, getEmail } from '../assets/account.ts'
import { AV } from '../assets/main.ts'

requireLogin()

var user = getUser()
var username = user.get('username')
var userInfo = new AV.Object('UserInfo')
var nickname = ref('')
var email = ref(user.get('email'))
var emailInfo = new AV.Object('Email')
var isPublicEmail = ref(false)
var isVerifiedEmail = ref(user.get('emailVerified'))
var verifyEmailClicked = ref(false)
var verifyEmailFailed = ref(false)
getUserInfo().then((tmpUserInfo) => {
  userInfo = tmpUserInfo
  nickname.value = userInfo.get('nickname')
})
getEmail().then((tmpEmailInfo) => {
  emailInfo = tmpEmailInfo
  isPublicEmail.value = emailInfo.getACL().getPublicReadAccess()
})

function sendEmailVerification() {
  AV.User.requestEmailVerify(email.value)
    .then(() => {
      verifyEmailClicked.value = true
    })
    .catch((error) => {
      verifyEmailFailed.value = true
    })
}
</script>

<template>
  <div class="content">
    <h1>设置</h1>
    <mdui-button>保存设置</mdui-button>
    <h2>全局设置</h2>
    <mdui-text-field label="用户名" variant="outlined" readonly :value="username"></mdui-text-field>
    <mdui-text-field label="昵称" v-model="nickname"></mdui-text-field>
    <div v-if="email">
      <mdui-text-field label="邮箱" v-model="email"></mdui-text-field>
      <mdui-checkbox :checked="isPublicEmail" @input="isPublicEmail = $event.target.value">公开邮箱</mdui-checkbox>
      邮箱状态：<span v-if="isVerifiedEmail">已验证✔</span><span v-else>未验证❌</span>
      <mdui-button v-if="!isVerifiedEmail" @click="sendEmailVerification()" :disabled="verifyEmailClicked">邮箱验证</mdui-button>
      <span v-if="verifyEmailClicked">验证邮件已发送</span>
      <span v-if="verifyEmailFailed">发送验证邮件失败</span>
    </div>
    <h2>游戏设置</h2>
    <mdui-checkbox>自动禁用不可用手势</mdui-checkbox>
    <h3>自定义手势</h3>
    <h2>外观</h2>
    <h3>主题</h3>
    <mdui-button>保存设置</mdui-button>
  </div>
</template>

<style scoped>
mdui-text-field,
mdui-checkbox,
mdui-button {
  margin: 5px;
  vertical-align: middle;
}
</style>
