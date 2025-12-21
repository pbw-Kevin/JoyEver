<script setup lang="ts">
import { serverURL } from '@/assets/main'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { setTopNotification } from '@/assets/topNotification'

const route = useRoute()
const router = useRouter()

var fullVerifyURL =
  serverURL + (serverURL.endsWith('/') ? '' : '/') + '1.1/verifyEmail/' + route.query.token

var errorInfo = ref('')

if (route.query.token) {
  errorInfo.value = ''
  var passQuery = new XMLHttpRequest()
  passQuery.open('GET', fullVerifyURL, true)
  passQuery.onreadystatechange = () => {
    if (passQuery.readyState === 4) {
      if (passQuery.status === 200) {
        setTopNotification('邮箱验证成功。')
        router.push({ name: 'Home' })
      } else if (JSON.parse(passQuery.responseText).error) {
        errorInfo.value = 'Token 无效或已过期。'
      } else {
        errorInfo.value = '连接服务器时失败。'
      }
    }
  }
} else {
  errorInfo.value = '缺少 Token。'
}
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.operation.emailVerify') }}</h1>
    <p class="error-info" v-if="errorInfo">
      验证失败。<br />
      错误：{{ errorInfo }}
    </p>
  </div>
</template>

<style scoped>
.error-info {
  color: rgb(var(--mdui-color-error));
}
</style>
