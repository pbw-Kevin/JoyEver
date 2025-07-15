import { ref, watch } from 'vue'
import { setColorScheme, setTheme, breakpoint, observeResize } from 'mdui'
import type { Theme } from 'mdui/internal/theme'
import { Query } from './main.ts'
import { sendNoti } from './notifications.ts'

var generalAppearanceQuery = new Query('GeneralAppearance')

var theme: Theme = 'auto'
var colorScheme = '#63ebb5'
var backgroundImage = ''
var backgroundImageOpacity = 0
var sidebarOpacity = 1

var localGeneralAppearance = {
  name: '',
  theme: theme || 'auto',
  colorScheme: colorScheme || '#ffffff',
  backgroundImage: backgroundImage || '',
  backgroundImageOpacity: backgroundImageOpacity || 0,
  sidebarOpacity: sidebarOpacity || 1,
}

var appearanceSetting = ref(localGeneralAppearance)

var appearanceSettingList: {
  name: string
  theme: Theme
  colorScheme: string
  backgroundImage: string
  backgroundImageOpacity: number
  sidebarOpacity: number
}[] = [localGeneralAppearance]

export function fetchAppearance() {
  generalAppearanceQuery.find().then(
    (list) => {
      appearanceSettingList = []
      list.forEach((item) => {
        var itemJSON = {
          name: item.get('name') || '',
          theme: item.get('theme') || 'auto',
          colorScheme: item.get('colorScheme') || '#ffffff',
          backgroundImage: item.get('backgroundImage') || '',
          backgroundImageOpacity: item.get('backgroundImageOpacity') || 0,
          sidebarOpacity: item.get('sidebarOpacity') || 1,
        }
        if (item.get('isDefault')) {
          appearanceSetting.value = itemJSON
        }
        appearanceSettingList.push(itemJSON)
      })
    },
    (error) => {
      sendNoti('获取默认外观列表失败', true)
    },
  )
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
    setTheme(val.theme)
    setColorScheme(val.colorScheme)
    document
      .querySelector('body')
      ?.style.setProperty('--sidebar-opacity', val.sidebarOpacity.toString())
  },
  { immediate: true },
)
