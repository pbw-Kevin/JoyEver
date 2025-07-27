<script setup lang="ts">
import { serverURL } from '../assets/main.ts'
import { useRoute, useRouter } from 'vue-router'
import { Axios } from 'axios'
import { ref } from 'vue'
import { setTopNotification } from '../assets/topNotification.ts'

const route = useRoute()
const router = useRouter()

var fullVerifyURL =
  serverURL + (serverURL.endsWith('/') ? '' : '/') + '1.1/verifyEmail/' + route.query.token

var errorInfo = ref('')

if (route.query.token) {
  errorInfo.value = ''
  var axios = new Axios()
  axios
    .post(fullVerifyURL)
    .then((response) => {
      if (response.data && JSON.parse(response.data).error) {
        errorInfo.value = 'Token 无效或已过期。'
      } else {
        setTopNotification('邮箱验证成功。')
        router.push({ name: 'Home' })
      }
    })
    .catch((error) => {
      errorInfo.value = '连接服务器时失败。'
    })
} else {
  errorInfo.value = '缺少 Token。'
}
</script>

<template>
  <div class="content">
    <h1>邮箱验证</h1>
    <p id="verify-error" v-if="errorInfo">
      验证失败。<br />
      错误：{{ errorInfo }}
    </p>
  </div>
</template>

<style scoped>
#verify-error {
  color: rgb(var(--mdui-color-error));
}
</style>
