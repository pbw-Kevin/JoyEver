/*
  Main Asset of JoyEver
*/

// Basic Vars
import * as AV from 'leancloud-storage'
export { AV }
import { Realtime, TextMessage } from 'leancloud-realtime'

// Basic Consts
const AppID = 'g5i93a9rDSYWpoNcokyG1X8W-MdYXbMMI'
const AppKey = 'kgE7V5kyD3MH9JhrKJACAvWQ'
export const serverURL = 'https://joyever.air-kevin-leancloud.rf.gd'

// Basic Functions
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// Initialization
AV.init({
  appId: AppID,
  appKey: AppKey,
  serverURL: serverURL,
})

export const realtime = new Realtime({
  appId: AppID,
  appKey: AppKey,
})
