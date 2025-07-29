<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import UserAvatar from './UserAvatar.vue'
import UserTag from './UserTag.vue'
type messageAlignment = 'left' | 'right'

const props = defineProps<{
  avatarURL?: string
  nickname?: string
  userTag?: {
    tag: string
    color: string
  }[]
  time?: string
  alignment: messageAlignment
  backgroundColor?: string
  href?: string
  routePath?: string
}>()
var router = useRouter()

var isRight = computed(() => {
  return props.alignment == 'right'
})
</script>

<template>
  <div
    class="message-piece"
    :style="{
      flexDirection: isRight ? 'row-reverse' : 'row',
      paddingLeft: isRight ? '0' : '10px',
      paddingRight: isRight ? '10px' : '0',
    }"
  >
    <UserAvatar class="avatar" :url="props.avatarURL"></UserAvatar>
    <div class="message-box" :style="{ textAlign: props.alignment }">
      <div class="message-head" :style="{ flexDirection: isRight ? 'row-reverse' : 'row' }">
        <div class="message-nickname" v-if="props.nickname">{{ props.nickname }}</div>
        <UserTag v-for="tag in props.userTag" :tag="tag.tag" :color="tag.color"></UserTag>
        <div class="message-time" v-if="props.time">{{ props.time }}</div>
      </div>
      <div class="message-card">
        <mdui-card
          @click="props.routePath ? router.push(props.routePath) : void 0"
          :style="{
            backgroundColor: props.backgroundColor,
            cursor: props.routePath ? 'pointer' : '',
          }"
          :href="props.href"
        >
          <slot></slot>
        </mdui-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 30px;
  min-width: 30px;
  height: 30px;
  font-size: 30px;
}

.message-piece {
  display: flex;
  flex-grow: 1;
  width: calc(100% - 10px);
  padding-top: 10px;
  padding-bottom: 10px;
}

.message-box {
  max-width: 100%;
}

.message-head {
  display: flex;
  width: 100%;
  padding-left: -40%;
}

.message-time {
  margin: 0 5px;
  font-size: 80%;
  color: rgb(var(--mdui-color-on-surface-variant));
}

mdui-card {
  padding: 10px;
  text-align: left;
  min-height: 40px;
  min-width: 30px;
  max-width: 80%;
  word-break: break-word;
}
</style>
