import { computed, ref } from 'vue'

export var windowHeight = ref(window.innerHeight)

window.addEventListener('resize', () => {
  windowHeight.value = window.innerHeight
})

export var chatContainerHeight = computed(() => {
  return windowHeight.value - 240
})
