<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  getUser,
  isEmail,
  isFormattedPassword,
  isFormattedUsername,
  register,
} from '@/assets/account'
import { sendNoti } from '@/assets/notifications'
import { setTopNotification } from '@/assets/topNotification'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
    errorInfo.value.username = t('account.register.message.emptyUsername')
  } else if (!isFormattedUsername(name.value)) {
    errorInfo.value.username = t('account.register.message.invalidUsername')
  } else if (isEmail(name.value)) {
    errorInfo.value.username = t('account.register.message.usernameWithEmailFormat')
  }
  if (!pass.value) {
    errorInfo.value.password = t('account.register.message.emptyPassword')
  } else if (!isFormattedPassword(pass.value)) {
    errorInfo.value.password = t('account.register.message.invalidPassword')
  }
  if (pass.value !== passAgain.value) {
    errorInfo.value.passwordAgain = t('account.register.message.differentPassword')
  }
  if (email.value && !isEmail(email.value)) {
    errorInfo.value.email = t('account.register.message.invalidEmail')
  }
  if (Object.values(errorInfo.value).some((msg) => msg)) {
    return
  }
  register(name.value, pass.value, passAgain.value, email.value).then((ret) => {
    if (ret) {
      if (ret.code == 0) {
        sendNoti(t('account.register.message.success'))
        if (getUser().get('email') && !getUser().get('emailVerified')) {
          setTopNotification(t('account.register.message.unverifiedEmail'))
        }
        router.push({ name: 'Home' })
      } else if (ret.code == 202) {
        errorInfo.value.username = t('account.register.message.usernameUsed')
      } else if (ret.code == 203) {
        errorInfo.value.email = t('account.register.message.emailUsed')
      } else if (ret.code == 15) {
        errorInfo.value.general = t('account.register.message.createObjectsError')
      } else {
        errorInfo.value.general = t('account.register.message.unknownError', {
          code: ret.code,
          message: ret.message,
        })
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
    <h1>{{ $t('account.register.title') }}</h1>
    <p class="error-info" v-if="errorInfo.general">{{ errorInfo.general }}</p>
    <form @submit.prevent="registerAccount()">
      <mdui-text-field
        :label="$t('account.register.username.title')"
        maxlength="16"
        required
        v-model="name"
      >
        <span slot="helper" class="error-info">{{ errorInfo.username }}</span>
      </mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        :label="$t('account.register.password.title')"
        required
        v-model="pass"
      >
        <span slot="helper" class="error-info">{{ errorInfo.password }}</span>
      </mdui-text-field>
      <mdui-text-field
        type="password"
        toggle-password
        :label="$t('account.register.ensurePassword.title')"
        required
        v-model="passAgain"
      >
        <span slot="helper" class="error-info">{{ errorInfo.passwordAgain }}</span>
      </mdui-text-field>
      <mdui-text-field type="email" :label="$t('account.register.email.title')" v-model="email">
        <span slot="helper" class="error-info">{{ errorInfo.email }}</span>
      </mdui-text-field>
      <mdui-button type="submit">{{ $t('account.operation.register') }}</mdui-button>
    </form>
    <div>
      {{ $t('account.register.message.alreadyHaveAccount')
      }}<RouterLink to="/login">{{ $t('account.operation.login') }}</RouterLink>
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
