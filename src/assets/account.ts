/*
  Asset for account service of JoyEver
*/

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { sendNoti } from './notifications.ts'
import { AV } from './main.ts'
import { getError } from './error.ts'

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
    await this.query[type].find().then((users) => {
      if (users.length == 1) {
        ret = users[0] as typeof ret
      }
    })
    return ret
  },
}

export var myInfoObject = {
  fetched: {
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
  fetch(): void
  get(name: RoleName): AV.Role | null
} = {
  fetched: false,
  object: {},
  async fetch() {
    if (this.fetched) return
    var query = new AV.Query('_Role')
    query.find().then((roles) => {
      roles.forEach((role) => {
        const name = role.get('name')
        if (name in (['admin', 'super_admin', 'site_owner'] as RoleName[])) {
          this.object[name as RoleName] = role as AV.Role
        }
      })
    })
    this.fetched = true
  },
  get(name: RoleName) {
    if (!this.fetched) this.fetch()
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
  if (!isLoggedIn()) curRole.value = []
  else myInfoObject.get('userRoles')
}

export function isEmail(s: string) {
  return /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(s)
}

export function isFormattedUsername(name: string) {
  return /^[A-Za-z][\w]{4,15}$/.test(name)
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
    },
    (error) => {
      ret.code = error.code
      ret.message = error.rawMessage
    },
  )
  updateLoggedInStat()
  myInfoObject.get('userRoles')
  return ret
}

export async function logout() {
  if (!isLoggedIn()) return
  await AV.User.logOut()
  updateLoggedInStat()
  sendNoti('登出成功！')
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
      if (email) {
        var emailObject = new AV.Object('Email')
        emailObject.set('username', getUser().get('username'))
        emailObject.set('email', email)
        var emailACL = new AV.ACL()
        emailACL.setReadAccess(user, true)
        emailACL.setWriteAccess(user, true)
        emailACL.setRoleReadAccess(roleObject.get('super_admin') as AV.Role, true)
        emailACL.setRoleWriteAccess(roleObject.get('super_admin') as AV.Role, true)
        emailObject.setACL(emailACL)
        emailObject.save().then(
          (emailObject) => {},
          (error) => {
            ret = getError(15)
          },
        )
      }
      var userInfoObject = new AV.Object('UserInfo')
      userInfoObject.set('nickname', name)
      userInfoObject.set('username', name)
      var userInfoACL = new AV.ACL()
      userInfoACL.setPublicReadAccess(true)
      userInfoACL.setWriteAccess(user, true)
      userInfoACL.setRoleWriteAccess(roleObject.get('super_admin') as AV.Role, true)
      userInfoObject.setACL(userInfoACL)
      userInfoObject.save().then(
        (userInfoObject) => {},
        (error) => {
          ret = getError(15)
        },
      )
      var privateUserInfoObject = new AV.Object('PrivateUserInfo')
      privateUserInfoObject.set('username', name)
      privateUserInfoObject.set('customAppearance', [])
      var privateUserInfoACL = new AV.ACL()
      privateUserInfoACL.setReadAccess(user, true)
      privateUserInfoACL.setWriteAccess(user, true)
      privateUserInfoACL.setRoleReadAccess(roleObject.get('super_admin') as AV.Role, true)
      privateUserInfoACL.setRoleWriteAccess(roleObject.get('super_admin') as AV.Role, true)
      privateUserInfoObject.setACL(privateUserInfoACL)
      privateUserInfoObject.save().then(
        (privateUserInfoObject) => {},
        (error) => {
          ret = getError(15)
        },
      )
    },
    (error) => {
      ret.code = error.code
      ret.message = error.rawMessage
    },
  )
  return ret
}
