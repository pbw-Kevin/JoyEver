<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { register } from '../assets/account.ts'
import { sendNoti } from '../assets/notifications.ts'

var router = useRouter()

var name = ref('')
var pass = ref('')
var passAgain = ref('')
var email = ref('')

var info = ref({
  code: -1,
  message: '',
})

function registerAccount() {
  register(name.value, pass.value, passAgain.value, email.value).then((ret) => {
    if (ret) {
      if (ret.code == 0) {
        sendNoti('注册成功！')
        if (email) router.push({ name: 'EmailVerify' })
        else router.push({ name: 'Home' })
      } else {
        console.log(ret) // Need better solution
      }
    }
  })
}
</script>

<template>
  <div class="content">
    <h1>注册新用户</h1>
    <form @submit.prevent="registerAccount()">
      <mdui-text-field label="用户名" maxlength="16" required v-model="name"></mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        label="密码"
        required
        v-model="pass"
      ></mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        label="确认密码"
        required
        v-model="passAgain"
      ></mdui-text-field>
      <mdui-text-field type="email" label="邮箱（可选）" v-model="email"></mdui-text-field>
      <mdui-button type="submit">注册</mdui-button>
    </form>
    <div>已有账号？<RouterLink to="/login">登录</RouterLink></div>
  </div>
</template>

<style scoped>
mdui-text-field {
  margin-bottom: 16px;
}
</style>
