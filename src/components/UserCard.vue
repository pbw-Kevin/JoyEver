<script setup lang="ts">
import { useRouter } from 'vue-router'
import '@mdui/icons/announcement.js'
import UserAvatar from './UserAvatar.vue'

const router = useRouter()

const props = defineProps<{
  nickname: string
  username?: string
  isAnnouncement?: boolean
  avatarURL?: string
  active?: boolean
  disabled?: boolean
  infoText?: string
  infoCount?: number
}>()
</script>

<template>
  <mdui-list-item
    alignment="center"
    :disabled="props.disabled"
    :active="props.active"
    @click="router.push(props.isAnnouncement ? '/announcement' : `/message/${props.username}`)"
  >
    {{ props.nickname }}
    <slot></slot>
    <mdui-icon-announcement slot="icon" v-if="props.isAnnouncement"></mdui-icon-announcement>
    <UserAvatar slot="icon" :url="props.avatarURL" v-else />
    <span slot="description" v-if="props.infoText">{{ props.infoText }}</span>
  </mdui-list-item>
</template>
