/*
  Main Asset of JoyEver
*/

// Basic Vars
import * as AV from 'leancloud-storage'
export const { Query, Object, User, Friendship } = AV
import { Realtime, TextMessage } from 'leancloud-realtime'

// Basic Consts
const AppID = 'g5i93a9rDSYWpoNcokyG1X8W-MdYXbMMI'
const AppKey = 'kgE7V5kyD3MH9JhrKJACAvWQ'
const serverURL = 'https://joyever.air-kevin-leancloud.rf.gd'

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
