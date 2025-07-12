import { ref, watch } from 'vue'
import { setColorScheme, setTheme, breakpoint, observeResize } from 'mdui'

var colorScheme = '#63ebb5'
var backgroundImage = 'https://pic.rmb.bdstatic.com/bjh/6310851983b636c0dbfd4ebeb4c50a2b.jpeg'
var backgroundImageOpacity = 0.3
var sidebarOpacity = 0.7

var appearanceSetting = ref({
  colorScheme: colorScheme,
  backgroundImage: backgroundImage,
  backgroundImageOpacity: backgroundImageOpacity,
  sidebarOpacity: sidebarOpacity,
})

export function useAppearance() {
  setTheme('auto')
  setColorScheme(appearanceSetting.value.colorScheme)
}

export function getAppearance() {
  return appearanceSetting
}

export var isDesktop = ref(breakpoint().up('md'))

export var backgroundImageLoaded = ref(false)

const observer = observeResize(document.body, function (entry, observer) {
  isDesktop.value = breakpoint().up('md')
})

watch(
  appearanceSetting,
  (val) => {
    document
      .querySelector('body')
      ?.style.setProperty('--sidebar-opacity', val.sidebarOpacity.toString())
  },
  { immediate: true },
)
