<script setup lang="ts">
import { serverURL } from '@/assets/main'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { setTopNotification } from '@/assets/topNotification'
import { logout } from '@/assets/account'

const route = useRoute()
const router = useRouter()

var fullVerifyURL =
  serverURL + (serverURL.endsWith('/') ? '' : '/') + '1.1/resetPassword/' + route.query.token

var errorInfo = ref('')

var pass = ref('')
var passAgain = ref('')

var formDisabled = ref(false)

function submitForm() {
  errorInfo.value = ''
  formDisabled.value = true
  if (route.query.token) {
    if (!pass.value || !passAgain.value) {
      errorInfo.value = '请填写密码。'
      formDisabled.value = false
      return
    }
    if (pass.value !== passAgain.value) {
      errorInfo.value = '两次输入的密码不一致。'
      formDisabled.value = false
      return
    }
    var passQuery = new XMLHttpRequest()
    passQuery.open('GET', fullVerifyURL + '?password=' + encodeURIComponent(pass.value), true)
    passQuery.onreadystatechange = () => {
      if (passQuery.readyState === 4) {
        if (passQuery.status === 200) {
          logout()
          setTopNotification('重置密码成功。')
          router.push({ name: 'Home' })
        } else if (JSON.parse(passQuery.responseText).error) {
          errorInfo.value = 'Token 无效或已过期。'
        } else {
          errorInfo.value = '连接服务器时失败。'
          formDisabled.value = false
        }
      }
    }
    passQuery.send()
  } else {
    errorInfo.value = '缺少 Token。'
    formDisabled.value = false
  }
}
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.operation.resetPassword') }}</h1>
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
      <mdui-button type="submit" :disabled="formDisabled">重置密码</mdui-button>
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
