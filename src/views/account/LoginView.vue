<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getUser, isEmail, isFormattedPassword, isFormattedUsername, login } from '@/assets/account'
import { sendNoti } from '@/assets/notifications'
import { setTopNotification } from '@/assets/topNotification'
import { fetchAppearance } from '@/assets/appearance'
import { useI18n } from 'vue-i18n'
const t = useI18n().t

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
    errorInfo.value.username = t('account.login.message.emptyUsernameEmail')
  } else if (!isFormattedUsername(name.value) && !isEmail(name.value)) {
    errorInfo.value.username = t('account.login.message.invalidUsernameEmail')
  }
  if (!pass.value) {
    errorInfo.value.password = t('account.login.message.emptyPassword')
  } else if (!isFormattedPassword(pass.value)) {
    errorInfo.value.password = t('account.login.message.invalidPassword')
  }
  if (Object.values(errorInfo.value).some((msg) => msg)) {
    return
  }
  login(name.value, pass.value).then((ret) => {
    if (ret) {
      if (!ret.code) {
        sendNoti(t('account.login.message.success'))
        if (getUser().get('email') && !getUser().get('emailVerified')) {
          setTopNotification(t('account.login.message.unverifiedEmail'))
        }
        fetchAppearance(true)
        router.push({ name: 'Home' })
      } else if (ret.code == 205) {
        errorInfo.value.username = t('account.login.message.cannotFindEmailUser')
      } else if (ret.code == 210) {
        errorInfo.value.password = t('account.login.message.mismatchUsernamePassword')
      } else if (ret.code == 211) {
        errorInfo.value.username = t('account.login.message.cannotFindUser')
      } else {
        errorInfo.value.general = t('account.login.message.unknownError', {
          code: ret.code,
          message: ret.message,
        })
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
    <h1>{{ $t('account.login.title') }}</h1>
    <p class="error-info" v-if="errorInfo.general">{{ errorInfo.general }}</p>
    <form @submit.prevent="loginAccount()">
      <mdui-text-field :label="$t('account.login.usernameEmail.title')" required v-model="name">
        <span slot="helper" class="error-info">{{ errorInfo.username }}</span>
      </mdui-text-field>
      <mdui-text-field
        :label="$t('account.login.password.title')"
        type="password"
        toggle-password
        required
        v-model="pass"
      >
        <span slot="helper" class="error-info">{{ errorInfo.password }}</span>
      </mdui-text-field>
      <mdui-button type="submit">{{ $t('account.operation.login') }}</mdui-button>
    </form>
    <div>
      {{ $t('account.login.tips.noAccount')
      }}<RouterLink to="/register">{{ $t('account.operation.register') }}</RouterLink>
    </div>
    <div>
      {{ $t('account.login.tips.forgotPassword')
      }}<RouterLink to="/preresetpassword">{{ $t('account.operation.resetPassword') }}</RouterLink>
    </div>
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
