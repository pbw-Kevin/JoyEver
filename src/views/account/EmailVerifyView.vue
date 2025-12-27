<script setup lang="ts">
import { serverURL } from '@/assets/main'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { setTopNotification } from '@/assets/topNotification'
import { getUser } from '@/assets/account'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
        setTopNotification(t('account.emailVerify.message.success'))
        getUser().fetch()
        router.push({ name: 'Home' })
      } else if (JSON.parse(passQuery.responseText).error) {
        errorInfo.value = t('account.emailVerify.message.expiredToken')
      } else {
        errorInfo.value = t('account.emailVerify.message.failedConnectServer')
      }
    }
  }
  passQuery.send()
} else {
  errorInfo.value = t('account.emailVerify.message.emptyToken')
}
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.emailVerify.title') }}</h1>
    <p class="error-info" v-if="errorInfo">
      {{ $t('account.emailVerify.message.failed') }}<br />
      {{ $t('account.emailVerify.message.error', { errorInfo }) }}
    </p>
  </div>
</template>

<style scoped>
.error-info {
  color: rgb(var(--mdui-color-error));
}
</style>
