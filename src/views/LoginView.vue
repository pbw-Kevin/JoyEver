<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { login } from '../assets/main.ts'

var name = ref("")
var pass = ref("")

var info = ref({
  a: 1
})

function loginAccount(){
  login(name.value,pass.value).then(
    (ret) => {
      info.value = ret;
    }
  )
}
</script>

<template>
  <div class="content">
    <h1>登录</h1>
    <form @submit.prevent="loginAccount()">
      <mdui-text-field label="用户名（邮箱）" required v-model="name"></mdui-text-field>
      <div style="width: 100%; height: 16px;"></div>
      <mdui-text-field label="密码" type="password" toggle-password required v-model="pass"></mdui-text-field>
      <div style="width: 100%; height: 16px;"></div>
      <mdui-button type="submit">登录</mdui-button>
    </form>
    <div>还没有账号？<RouterLink to="/register">注册</RouterLink></div>
    <div>{{ info }} {{ name }} {{ pass }}</div>
  </div>
</template>
