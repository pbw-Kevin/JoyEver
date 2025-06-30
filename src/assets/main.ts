/*
  Main Asset of JoyEver
*/

// Basic Vars
import * as AV from 'leancloud-storage'
export const { Query, User } = AV;
import { Realtime, TextMessage } from 'leancloud-realtime'
import { ref } from 'vue'
import { snackbar } from 'mdui'

// Basic Consts
const AppID = "g5i93a9rDSYWpoNcokyG1X8W-MdYXbMMI";
const AppKey = "kgE7V5kyD3MH9JhrKJACAvWQ";

// Initialization
AV.init({
  appId: AppID,
  appKey: AppKey
});

export const realtime = new Realtime({
  appId: AppID,
  appKey: AppKey
});

// Message
export var msgcnt = ref(1)