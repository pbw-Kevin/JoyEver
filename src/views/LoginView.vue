<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { login } from '../assets/account.ts';
import { sendNoti } from '../assets/notifications.ts';

var router = useRouter();

var name = ref("");
var pass = ref("");

var info = ref({
  code: 0,
  message: ""
});

function loginAccount(){
  login(name.value,pass.value).then(
    (ret) => {
      if(!ret.code){
        sendNoti("登录成功！");
        router.push({ name: 'Home' });
      }
      else{
        info.value = ret;
      }
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
    <div>忘记密码？<RouterLink to="/resetpassword">重置密码</RouterLink></div>
    <!-- <div>{{ info }} {{ name }} {{ pass }}</div> -->
  </div>
</template>
