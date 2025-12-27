<script setup lang="ts">
import { serverURL } from '@/assets/main'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { setTopNotification } from '@/assets/topNotification'
import { isFormattedPassword, logout } from '@/assets/account'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute()
const router = useRouter()

var fullVerifyURL =
  serverURL + (serverURL.endsWith('/') ? '' : '/') + '1.1/resetPassword/' + route.query.token

var errorInfo = ref('')

var pass = ref('')
var passAgain = ref('')

var formDisabled = ref(false)

onMounted(() => {
  if (!route.query.token) {
    errorInfo.value = t('account.resetPassword.message.emptyToken')
    formDisabled.value = true
  }
})

function submitForm() {
  errorInfo.value = ''
  formDisabled.value = true
  if (!route.query.token) return
  if (!pass.value || !passAgain.value) {
    errorInfo.value = t('account.resetPassword.message.emptyPassword')
    formDisabled.value = false
    return
  }
  if (pass.value !== passAgain.value) {
    errorInfo.value = t('account.resetPassword.message.differentPassword')
    formDisabled.value = false
    return
  }
  if (!isFormattedPassword(pass.value)) {
    errorInfo.value = t('account.resetPassword.message.invalidPassword')
    formDisabled.value = false
    return
  }
  var passQuery = new XMLHttpRequest()
  passQuery.open('GET', fullVerifyURL + '?password=' + encodeURIComponent(pass.value), true)
  passQuery.onreadystatechange = () => {
    if (passQuery.readyState === 4) {
      if (passQuery.status === 200) {
        logout()
        setTopNotification(t('account.resetPassword.message.success'))
        router.push({ name: 'Home' })
      } else if (JSON.parse(passQuery.responseText).error) {
        errorInfo.value = t('account.resetPassword.message.expiredToken')
      } else {
        errorInfo.value = t('account.resetPassword.message.failedConnectServer')
        formDisabled.value = false
      }
    }
  }
  passQuery.send()
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
        :label="$t('account.resetPassword.password.title')"
        v-model="pass"
      ></mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        :label="$t('account.resetPassword.ensurePassword.title')"
        v-model="passAgain"
      ></mdui-text-field>
      <mdui-button type="submit" :disabled="formDisabled">{{
        $t('account.operation.resetPassword')
      }}</mdui-button>
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
