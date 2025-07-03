<script setup lang="ts">
const props = defineProps<{
  tag: string
  color?: string
}>()
</script>

<template>
  <div class="user-tag" :style="{ 'background-color': props.color || 'grey' }">
    {{ props.tag }}
  </div>
</template>

<style>
.user-tag {
  display: inline;
  white-space: nowrap;
  padding: 0 4px 0 4px;
  margin: 0 3px 0 3px;
  font-size: 60%;
  color: white;
  border-radius: var(--mdui-shape-corner-small);
}
</style>
