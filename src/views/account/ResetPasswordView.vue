<script setup lang="ts">
import { serverURL } from '@/assets/main.ts'
import { useRoute, useRouter } from 'vue-router'
import { Axios } from 'axios'
import { ref } from 'vue'
import { setTopNotification } from '@/assets/topNotification.ts'
import { logout } from '@/assets/account.ts'

const route = useRoute()
const router = useRouter()

var fullVerifyURL =
  serverURL + (serverURL.endsWith('/') ? '' : '/') + '1.1/resetPassword/' + route.query.token

var errorInfo = ref('')

var pass = ref('')
var passAgain = ref('')

function submitForm() {
  errorInfo.value = ''
  if (route.query.token) {
    if (!pass.value || !passAgain.value) {
      errorInfo.value = '请填写密码。'
      return
    }
    if (pass.value !== passAgain.value) {
      errorInfo.value = '两次输入的密码不一致。'
      return
    }
    var axios = new Axios()
    axios
      .get(fullVerifyURL, {
        params: {
          password: pass.value,
        },
      })
      .then((response) => {
        if (response.data && JSON.parse(response.data).error) {
          errorInfo.value = 'Token 无效或已过期。'
        } else {
          logout()
          setTopNotification('重置密码成功。')
          router.push({ name: 'Home' })
        }
      })
      .catch((error) => {
        errorInfo.value = '连接服务器时失败。'
      })
  } else {
    errorInfo.value = '缺少 Token。'
  }
}
</script>

<template>
  <div class="content">
    <h1>重置密码</h1>
    <p class="error-info" v-if="errorInfo">{{ errorInfo }}</p>
    <form @submit.prevent="submitForm()">
      <mdui-text-field
        type="password"
        toggle-password
        label="密码"
        v-model="pass"
      ></mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        label="确认密码"
        v-model="passAgain"
      ></mdui-text-field>
      <mdui-button type="submit">重置密码</mdui-button>
    </form>
  </div>
</template>

<style scoped>
mdui-button,
mdui-text-field {
  margin: 5px 0;
}

.error-info {
  color: rgb(var(--mdui-color-error));
}
</style>
