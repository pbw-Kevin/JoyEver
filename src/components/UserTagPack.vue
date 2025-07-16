<script setup lang="ts">
import UserTag from './UserTag.vue'
var prop = defineProps<{
  roles: string[]
}>()
</script>

<template>
  <UserTag tag="用户" v-if="prop.roles.length == 0" />
  <UserTag tag="管理员" color="purple" v-if="prop.roles.indexOf('admin') != -1" />
  <UserTag tag="超级管理员" color="green" v-if="prop.roles.indexOf('super_admin') != -1" />
  <UserTag tag="站长" color="aqua" v-if="prop.roles.indexOf('site_owner') != -1" />
  <UserTag tag="已封禁" color="brown" v-if="false" />
</template>
