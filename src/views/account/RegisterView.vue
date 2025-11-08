<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  getUser,
  isEmail,
  isFormattedPassword,
  isFormattedUsername,
  register,
} from '@/assets/account.ts'
import { sendNoti } from '@/assets/notifications.ts'
import { setTopNotification } from '@/assets/topNotification.ts'

var router = useRouter()

var name = ref('')
var pass = ref('')
var passAgain = ref('')
var email = ref('')

var errorInfoEmpty = {
  general: '',
  username: '',
  password: '',
  passwordAgain: '',
  email: '',
}
var errorInfo = ref(errorInfoEmpty)

function registerAccount() {
  errorInfo.value = { ...errorInfoEmpty }
  if (!name.value) {
    errorInfo.value.username = '用户名不能为空。'
  } else if (!isFormattedUsername(name.value)) {
    errorInfo.value.username =
      '用户名格式不正确。用户名的长度应在 5 到 16 个字符之间，且只能包含字母、数字和下划线，其中第一个字符必须是字母。'
  } else if (isEmail(name.value)) {
    errorInfo.value.username = '用户名格式不正确。用户名不应具有邮箱的格式。'
  }
  if (!pass.value) {
    errorInfo.value.password = '密码不能为空。'
  } else if (!isFormattedPassword(pass.value)) {
    errorInfo.value.password = '密码格式不正确。密码的长度应至少为 8个字符，且不为空白字符。'
  }
  if (pass.value !== passAgain.value) {
    errorInfo.value.passwordAgain = '两次输入的密码不一致。'
  }
  if (email.value && !isEmail(email.value)) {
    errorInfo.value.email = '邮箱格式不正确。'
  }
  if (Object.values(errorInfo.value).some((msg) => msg)) {
    return
  }
  register(name.value, pass.value, passAgain.value, email.value).then((ret) => {
    if (ret) {
      if (ret.code == 0) {
        sendNoti('注册成功！')
        if (getUser().get('email') && !getUser().get('emailVerified')) {
          setTopNotification('尚未验证邮箱。验证邮箱以获得更安全的账号体验。转到“账号设置”以验证。')
        }
        router.push({ name: 'Home' })
      } else if (ret.code == 202) {
        errorInfo.value.username = '用户名已被注册。'
      } else if (ret.code == 203) {
        errorInfo.value.email = '邮箱已被注册。'
      } else if (ret.code == 15) {
        errorInfo.value.general =
          '注册完成，但是在创建账号相关的必要 Objects 时发生错误。现在可以正常登录并使用，但可能会有潜在的一些功能性问题。如必要，请联系管理员以获取帮助。'
      } else {
        errorInfo.value.general = `注册失败，错误代码：${ret.code}。错误信息： ${ret.message}。如必要，请联系管理员以获取帮助。`
        // console.log(ret) // Need better solution
      }
    }
  })
}
watch(
  [name, pass, passAgain, email],
  () => {
    errorInfo.value = { ...errorInfoEmpty }
  },
  { immediate: true },
)
</script>

<template>
  <div class="content">
    <h1>注册新用户</h1>
    <p class="error-info" v-if="errorInfo.general">{{ errorInfo.general }}</p>
    <form @submit.prevent="registerAccount()">
      <mdui-text-field label="用户名" maxlength="16" required v-model="name">
        <span slot="helper" class="error-info">{{ errorInfo.username }}</span>
      </mdui-text-field>
      <mdui-text-field type="password" toggle-password label="密码" required v-model="pass">
        <span slot="helper" class="error-info">{{ errorInfo.password }}</span>
      </mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        label="确认密码"
        required
        v-model="passAgain"
      >
        <span slot="helper" class="error-info">{{ errorInfo.passwordAgain }}</span>
      </mdui-text-field>
      <mdui-text-field type="email" label="邮箱（可选）" v-model="email">
        <span slot="helper" class="error-info">{{ errorInfo.email }}</span>
      </mdui-text-field>
      <mdui-button type="submit">注册</mdui-button>
    </form>
    <div>已有账号？<RouterLink to="/login">登录</RouterLink></div>
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
