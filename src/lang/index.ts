import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export type AvailableLang = keyof typeof messages

export const getDefaultLanguage = (): AvailableLang => {
  const navLang = navigator.language
  if (messages.hasOwnProperty(navLang)) {
    return navLang as AvailableLang
  }
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getDefaultLanguage(),
  messages,
})

export default i18n
