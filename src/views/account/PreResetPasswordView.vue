<script lang="ts" setup>
import { ref, watch } from 'vue'
import { AV } from '@/assets/main'
import { isEmail } from '@/assets/account'

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
    errorInfo.value = '请输入绑定的邮箱地址。'
    return
  } else if (!isEmail(email.value)) {
    errorInfo.value = '请输入有效的邮箱地址。'
    return
  }

  AV.User.requestPasswordReset(email.value)
    .then(() => {
      successed.value = true
    })
    .catch((error) => {
      if (error.code === 205) {
        errorInfo.value = '找不到绑定该邮箱的用户。'
      } else {
        errorInfo.value = `发生错误。错误码： ${error.code}。错误信息： ${error.message}。如必要，请联系管理员以获取帮助。`
      }
    })
}
</script>

<template>
  <div class="content">
    <h1>{{ $t('account.operation.resetPassword') }}</h1>
    <p>此功能要求账号已绑定邮箱。</p>
    <p>请输入账号绑定的邮箱地址，我们将向该邮箱发送重置密码的链接。</p>
    <mdui-text-field label="邮箱" v-model="email" type="email" required>
      <span slot="helper" class="error-info">
        {{ errorInfo }}
      </span>
    </mdui-text-field>
    <br />
    <mdui-button :disabled="!email" @click="submitResetPassword()"> 发送重置链接 </mdui-button>
    <p v-if="successed">重置链接已发送到您的邮箱，请检查您的收件箱。</p>
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
