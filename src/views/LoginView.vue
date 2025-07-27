<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  getUser,
  isEmail,
  isFormattedPassword,
  isFormattedUsername,
  login,
} from '../assets/account.ts'
import { sendNoti } from '../assets/notifications.ts'
import { setTopNotification } from '../assets/topNotification.ts'

var router = useRouter()

var name = ref('')
var pass = ref('')

var errorInfoEmpty = {
  general: '',
  username: '',
  password: '',
}
var errorInfo = ref(errorInfoEmpty)

function loginAccount() {
  errorInfo.value = { ...errorInfoEmpty }
  if (!name.value) {
    errorInfo.value.username = '用户名（邮箱）不能为空。'
  } else if (!isFormattedUsername(name.value) && !isEmail(name.value)) {
    errorInfo.value.username =
      '不是有效的用户名或邮箱。用户名的长度应在 5 到 16 个字符之间，且只能包含字母、数字和下划线，其中第一个字符必须是字母。'
  }
  if (!pass.value) {
    errorInfo.value.password = '密码不能为空。'
  } else if (!isFormattedPassword(pass.value)) {
    errorInfo.value.password = '密码格式不正确。密码的长度应至少为 8 个字符，且不为空白字符。'
  }
  if (Object.values(errorInfo.value).some((msg) => msg)) {
    return
  }
  login(name.value, pass.value).then((ret) => {
    if (ret) {
      if (!ret.code) {
        sendNoti('登录成功！')
        if (getUser().get('email') && !getUser().get('emailVerified')) {
          setTopNotification('尚未验证邮箱。验证邮箱以获得更安全的账号体验。转到“账号设置”以验证。')
        }
        router.push({ name: 'Home' })
      } else if (ret.code == 205) {
        errorInfo.value.username = '找不到邮箱对应的用户。'
      } else if (ret.code == 210) {
        errorInfo.value.password = '用户名和密码不匹配。'
      } else if (ret.code == 211) {
        errorInfo.value.username = '找不到用户。'
      } else {
        errorInfo.value.general = `登录失败。错误码： ${ret.code}。错误信息： ${ret.message}。如必要，请联系管理员以获取帮助。`
        // console.log(ret) // Need better solution
      }
    }
  })
}

watch(
  [name, pass],
  () => {
    errorInfo.value = { ...errorInfoEmpty }
  },
  { immediate: true },
)
</script>

<template>
  <div class="content">
    <h1>登录</h1>
    <p class="error-info" v-if="errorInfo.general">{{ errorInfo.general }}</p>
    <form @submit.prevent="loginAccount()">
      <mdui-text-field label="用户名（邮箱）" required v-model="name">
        <span slot="helper" class="error-info">{{ errorInfo.username }}</span>
      </mdui-text-field>
      <mdui-text-field label="密码" type="password" toggle-password required v-model="pass">
        <span slot="helper" class="error-info">{{ errorInfo.password }}</span>
      </mdui-text-field>
      <mdui-button type="submit">登录</mdui-button>
    </form>
    <div>还没有账号？<RouterLink to="/register">注册</RouterLink></div>
    <div>忘记密码？<RouterLink to="/resetpassword">重置密码</RouterLink></div>
  </div>
</template>

<style scoped>
mdui-text-field {
  margin-bottom: 16px;
}

.error-info {
  color: rgb(var(--mdui-color-error));
}
</style>
