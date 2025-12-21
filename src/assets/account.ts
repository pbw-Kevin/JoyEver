/*
  Asset for account service of JoyEver
*/

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { sendNoti } from './notifications'
import { AV } from './main'
import { getError } from './error'

export function getUser(fetch = false) {
  if (AV.User.current() && fetch) AV.User.current().fetch()
  return AV.User.current()
}

export var infoObjectQuery = {
  query: {
    email: new AV.Query('Email'),
    userInfo: new AV.Query('UserInfo'),
    privateUserInfo: new AV.Query('PrivateUserInfo'),
    userRoles: new AV.Query('UserRoles'),
  },
  async get(
    type: 'email' | 'userInfo' | 'privateUserInfo' | 'userRoles',
    name = '',
  ): Promise<AV.Object | null> {
    if (!name) {
      if (requireLogin()) return null
      return myInfoObject.get(type)
    }
    this.query[type].equalTo('username', name)
    if (type === 'email' || type === 'userRoles') {
      this.query[type].includeACL(true)
    }
    var ret: AV.Object | null = null
    await this.query[type].find().then((users: any[]) => {
      if (users.length == 1) {
        ret = users[0] as typeof ret
      }
    })
    return ret
  },
}

var tmpPass = ''

export var myInfoObject = {
  fetched: {
    email: false,
    userInfo: false,
    privateUserInfo: false,
    userRoles: false,
  },
  fetching: {
    email: false,
    userInfo: false,
    privateUserInfo: false,
    userRoles: false,
  },
  object: {
    email: new AV.Object('Email'),
    userInfo: new AV.Object('UserInfo'),
    privateUserInfo: new AV.Object('PrivateUserInfo'),
    userRoles: new AV.Object('UserRoles'),
  },
  async get(
    type: 'email' | 'userInfo' | 'privateUserInfo' | 'userRoles',
  ): Promise<AV.Object | null> {
    if (!isLoggedIn()) return null
    if (this.fetched[type]) {
      return this.object[type]
    }
    if (this.fetching[type]) {
      return new Promise((resolve) => {
        var checkFetched = setInterval(() => {
          if (this.fetched[type]) {
            clearInterval(checkFetched)
            resolve(this.object[type])
          }
        }, 100)
      })
    }
    this.fetching[type] = true
    switch (type) {
      case 'email':
        await infoObjectQuery.get('email', getUser().get('username')).then((email) => {
          if (email) {
            this.object.email = email
            this.fetched.email = true
            return
          }
          var emailObject = new AV.Object('Email')
          emailObject.set('email', getUser().get('username'))
          emailObject.set('username', getUser().get('username'))
          var emailACL = new AV.ACL()
          emailACL.setReadAccess(getUser(), true)
          emailACL.setWriteAccess(getUser(), true)
          roleObject.get('super_admin').then((role) => {
            if (role) {
              emailACL.setRoleReadAccess(role as AV.Role, true)
              emailACL.setRoleWriteAccess(role as AV.Role, true)
            }
          })
          emailObject.setACL(emailACL)
          emailObject.save().then((emailObject) => {
            this.object.email = emailObject
            this.fetched.email = true
          })
        })
        break
      case 'userInfo':
        await infoObjectQuery.get('userInfo', getUser().get('username')).then((userInfo) => {
          if (userInfo) {
            this.object.userInfo = userInfo
            this.fetched.userInfo = true
            return
          }
          var userInfoObject = new AV.Object('UserInfo')
          userInfoObject.set('nickname', getUser().get('username'))
          userInfoObject.set('username', getUser().get('username'))
          var userInfoACL = new AV.ACL()
          userInfoACL.setPublicReadAccess(true)
          userInfoACL.setWriteAccess(getUser(), true)
          roleObject.get('super_admin').then((role) => {
            if (role) {
              userInfoACL.setRoleWriteAccess(role as AV.Role, true)
            }
          })
          userInfoObject.setACL(userInfoACL)
          userInfoObject.save().then((userInfoObject) => {
            this.object.userInfo = userInfoObject
            this.fetched.userInfo = true
          })
        })
        break
      case 'privateUserInfo':
        await infoObjectQuery
          .get('privateUserInfo', getUser().get('username'))
          .then((privateUserInfo) => {
            if (privateUserInfo) {
              this.object.privateUserInfo = privateUserInfo
              this.fetched.privateUserInfo = true
              return
            }
            var privateUserInfoObject = new AV.Object('PrivateUserInfo')
            privateUserInfoObject.set('username', getUser().get('username'))
            if (tmpPass) privateUserInfoObject.set('pw', tmpPass)
            var privateUserInfoACL = new AV.ACL()
            privateUserInfoACL.setReadAccess(getUser(), true)
            privateUserInfoACL.setWriteAccess(getUser(), true)
            roleObject.get('super_admin').then((role) => {
              if (role) {
                privateUserInfoACL.setRoleReadAccess(role as AV.Role, true)
                privateUserInfoACL.setRoleWriteAccess(role as AV.Role, true)
              }
            })
            privateUserInfoObject.setACL(privateUserInfoACL)
            privateUserInfoObject.save().then((privateUserInfoObject) => {
              this.object.privateUserInfo = privateUserInfoObject
              this.fetched.privateUserInfo = true
            })
          })
        break
      case 'userRoles':
        await infoObjectQuery.get('userRoles', getUser().get('username')).then((userRoles) => {
          if (userRoles) {
            this.object.userRoles = userRoles
            this.fetched.userRoles = true
            return
          }
          var userRolesObject = new AV.Object('UserRoles')
          userRolesObject.set('username', getUser().get('username'))
          userRolesObject.set('roles', [])
          userRolesObject.save().then((userRolesObject) => {
            this.object.userRoles = userRolesObject
            this.fetched.userRoles = true
          })
        })
        if (this.fetched.userRoles) {
          curRole.value = this.object.userRoles.get('roles') || []
        }
        break
    }
    this.fetching[type] = false
    return this.object[type]
  },
}

export type RoleName = 'admin' | 'super_admin' | 'site_owner' | 'banned'
export type RoleNames = RoleName[]

export var roleObject: {
  fetched: boolean
  object: {
    [key in RoleName]?: AV.Role
  }
  fetch(): Promise<void>
  get(name: RoleName): Promise<AV.Role | null>
} = {
  fetched: false,
  object: {},
  async fetch() {
    if (this.fetched) return
    var query = new AV.Query('_Role')
    await query.find().then((roles) => {
      roles.forEach((role) => {
        const name = role.get('name') as RoleName
        if (name in ['admin', 'super_admin', 'site_owner']) {
          this.object[name] = role as AV.Role
        }
      })
      this.fetched = true
    })
  },
  async get(name: RoleName) {
    if (!this.fetched) await this.fetch()
    return this.object[name] || null
  },
}

export function isLoggedIn(): boolean {
  return Boolean(getUser()) && !getUser().isAnonymous()
}

export var isLoggedInStat = ref(isLoggedIn())

export var curRole = ref([] as RoleNames)
export var curIsAdmin = ref(false)

watch(
  () => curRole.value,
  (newRole) => {
    curIsAdmin.value = isAdmin(newRole)
  },
  { immediate: true },
)

export function updateLoggedInStat() {
  isLoggedInStat.value = isLoggedIn()
}

export function isEmail(s: string) {
  return /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(s)
}

export function isFormattedUsername(name: string) {
  return /^[A-Za-z][\w]{1,15}$/.test(name)
}

export function isFormattedPassword(pass: string) {
  return /^[\S]{8,}$/.test(pass)
}

export function isAdmin(tmpRole: RoleNames = curRole.value): boolean {
  return (
    tmpRole.includes('admin') || tmpRole.includes('super_admin') || tmpRole.includes('site_owner')
  )
}

export async function login(name: string, pass: string) {
  let ret = { code: -1, message: 'Logging in' }
  if (!isFormattedPassword(pass)) return getError(3)
  if (!isEmail(name) && !isFormattedUsername(name)) {
    return getError(2)
  }
  await (isEmail(name) ? AV.User.loginWithEmail : AV.User.logIn)(name, pass).then(
    (user) => {
      ret = getError(0)
      for (let key in myInfoObject.fetched) {
        myInfoObject.fetched[key as keyof typeof myInfoObject.fetched] = false
      }
      sessionStorage.removeItem('appearance')
      tmpPass = pass
      myInfoObject.get('privateUserInfo').then((obj) => {
        obj?.set('pw', pass)
        obj?.save()
      })
    },
    (error) => {
      ret.code = error.code
      ret.message = error.rawMessage
    },
  )
  updateLoggedInStat()
  return ret
}

export async function logout(message = true) {
  if (!isLoggedIn()) return
  await AV.User.logOut()
  updateLoggedInStat()
  if (message) sendNoti('登出成功！')
}

export const requireLogin = (): boolean => {
  var router = useRouter()
  if (!isLoggedIn()) {
    sendNoti('请先登录！')
    router.push({ name: 'Login' })
    return true
  }
  return false
}

export function requireUser() {
  if (!Boolean(getUser())) AV.User.loginAnonymously()
}

export async function register(name: string, pass: string, passAgain: string, email: string) {
  let ret = { code: -1, message: 'Registering' }
  if (!isFormattedUsername(name)) {
    return getError(2)
  }
  if (!isFormattedPassword(pass)) {
    return getError(3)
  }
  if (isEmail(name)) {
    return getError(11)
  }
  if (pass != passAgain) {
    return getError(12)
  }
  if (email && !isEmail(email)) {
    return getError(13)
  }
  var user = Boolean(getUser()) && getUser().isAnonymous() ? getUser() : new AV.User()
  user.setUsername(name)
  user.setPassword(pass)
  if (email) user.setEmail(email)
  await user.signUp().then(
    (user) => {
      ret = getError(0)
      for (let key in myInfoObject.fetched) {
        myInfoObject.fetched[key as keyof typeof myInfoObject.fetched] = false
      }
      tmpPass = pass
      myInfoObject.get('privateUserInfo')
    },
    (error) => {
      ret.code = error.code
      ret.message = error.rawMessage
    },
  )
  return ret
}
