<script lang="ts" setup>
import { ref, watch } from 'vue'
import { AV } from '@/assets/main'
import { isEmail } from '@/assets/account'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

var email = ref('')
var errorInfo = ref('')
var successed = ref(false)

watch(email, () => {
  errorInfo.value = ''
  successed.value = false
})

function submitResetPassword() {
  errorInfo.value = ''
  successed.value = false
  if (!email.value) {
    errorInfo.value = t('account.preResetPassword.message.emptyEmail')
    return
  } else if (!isEmail(email.value)) {
    errorInfo.value = t('account.preResetPassword.message.invalidEmail')
    return
  }

  AV.User.requestPasswordReset(email.value)
    .then(() => {
      successed.value = true
    })
    .catch((error) => {
      if (error.code === 205) {
        errorInfo.value = t('account.preResetPassword.message.cannotFindEmailUser')
      } else {
        errorInfo.value = t('account.preResetPassword.message.unknownError', {
          code: error.code,
          message: error.message,
        })
      }
    })
}
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.preResetPassword.title') }}</h1>
    <p v-html="$t('account.preResetPassword.disc')"></p>
    <mdui-text-field
      :label="$t('account.preResetPassword.email.title')"
      v-model="email"
      type="email"
      required
    >
      <span slot="helper" class="error-info">
        {{ errorInfo }}
      </span>
    </mdui-text-field>
    <br />
    <mdui-button :disabled="!email" @click="submitResetPassword()">{{
      $t('account.preResetPassword.operation.send')
    }}</mdui-button>
    <p v-if="successed">{{ $t('account.preResetPassword.message.success') }}</p>
  </div>
</template>

<style scoped>
mdui-text-field {
  margin-bottom: 10px;
}

.error-info {
  color: rgb(var(--mdui-color-error));
}
</style>
