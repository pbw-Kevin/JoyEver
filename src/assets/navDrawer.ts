/*
  Asset for navigation drawer component of JoyEver
*/

import { ref } from 'vue'
import { breakpoint } from 'mdui'
import { useRoute } from 'vue-router'

export var navOpened = ref(breakpoint().up('md'))

export var WikiCollActive = ref(false)

export function UpdateNavOpened(val: boolean = breakpoint().up('md')) {
  navOpened.value = val
}

export function checkRoute(curRoute: Array<string>) {
  return curRoute.includes(useRoute().name as string)
}
