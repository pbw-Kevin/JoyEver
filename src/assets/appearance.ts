import { ref } from 'vue'
import { setColorScheme } from 'mdui'

var colorScheme = '#3ae997'
var backgroundImage = 'https://pic.rmb.bdstatic.com/bjh/6310851983b636c0dbfd4ebeb4c50a2b.jpeg'
var backgroundImageOpacity = 0.3

var appearanceSetting = ref({
  colorScheme: colorScheme,
  backgroundImage: backgroundImage,
  backgroundImageOpacity: backgroundImageOpacity,
})

export function useAppearance() {
  setColorScheme(appearanceSetting.value.colorScheme)
}

export function getAppearance() {
  return appearanceSetting
}
