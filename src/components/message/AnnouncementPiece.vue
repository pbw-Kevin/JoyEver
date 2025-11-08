<script setup lang="ts">
import { useRouter } from 'vue-router'
import UserTag from '../account/UserTag.vue'
import '@mdui/icons/announcement.js'

const props = defineProps<{
  time?: string
  href?: string
  routePath?: string
}>()
var router = useRouter()
</script>

<template>
  <div class="announcement-piece">
    <mdui-icon-announcement class="avatar"></mdui-icon-announcement>
    <div class="announcement-box">
      <div class="announcement-head">
        <div class="announcement-nickname">
          公告
          <UserTag tag="官方公告" color="green"></UserTag>
        </div>
        <div class="announcement-time" v-if="props.time">{{ props.time }}</div>
      </div>
      <div class="announcement-card">
        <mdui-card
          @click="props.routePath ? router.push(props.routePath) : void 0"
          :style="{
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

.announcement-piece {
  display: flex;
  flex-grow: 1;
  width: calc(100% - 10px);
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}

.announcement-box {
  max-width: 100%;
}

.announcement-head {
  display: flex;
  width: 100%;
  padding-left: -40%;
}

.announcement-time {
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
