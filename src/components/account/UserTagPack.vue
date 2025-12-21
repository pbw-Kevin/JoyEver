<script setup lang="ts">
import UserTag from './UserTag.vue'
import { type RoleNames } from '@/assets/account'
var prop = defineProps<{
  roles: RoleNames
}>()
</script>

<template>
  <UserTag :tag="$t('user.tags.user')" v-if="prop.roles.length == 0" />
  <UserTag :tag="$t('user.tags.admin')" color="purple" v-if="prop.roles.indexOf('admin') != -1" />
  <UserTag
    :tag="$t('user.tags.superAdmin')"
    color="green"
    v-if="prop.roles.indexOf('super_admin') != -1"
  />
  <UserTag
    :tag="$t('user.tags.siteOwner')"
    color="aqua"
    v-if="prop.roles.indexOf('site_owner') != -1"
  />
  <UserTag :tag="$t('users.tag.banned')" color="brown" v-if="false" />
</template>
