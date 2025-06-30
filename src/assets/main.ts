/*
  Main Asset of JoyEver
*/

// Basic Vars
import * as AV from 'leancloud-storage'
export const { Query, User } = AV;
import { Realtime, TextMessage } from 'leancloud-realtime'
import { ref } from 'vue'
import { snackbar, breakpoint } from 'mdui'

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

// Account Related Functions
export function isLoggedIn():boolean{
  return (Boolean)(User.current());
}

export var isLoggedInStat = ref(isLoggedIn());

export function updateLoggedInStat(){
  isLoggedInStat.value = isLoggedIn();
}

export function isEmail(s: string){
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(s);
}

export async function login(name: string, pass: string):Promise<Object>{
  let ret = { code: -1, message: "" };
  if(isEmail(name)){
    console.log("Email");
    await User.loginWithEmail(name, pass).then(
      (user) => {
        ret.code = 0;
        ret.message = "Success!";
      },
      (error) => {
        ret.code = error.code;
        ret.message = error.rawMessage;
      }
    );
  }
  else{
    console.log("Username");
    await User.logIn(name, pass).then(
      (user) => {
        ret.code = 0;
        ret.message = "Success!";
      },
      (error) => {
        ret.code = error.code;
        ret.message = error.rawMessage;
      }
    );
  }
  updateLoggedInStat();
  return ret;
}

export async function logout() {
  await User.logOut();
  updateLoggedInStat();
}

export function logoutSnackbar() {
  snackbar({
    message: "登出成功！",
    closeable: true,
    placement: 'bottom-start'
  });
}

// Navigation Drawer
export var navOpened = ref(breakpoint().up('md'));

// Message
export var msgcnt = ref(1)