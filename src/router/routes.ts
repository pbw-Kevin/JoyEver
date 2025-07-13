var routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: '首页 - 永乐大典',
    },
  },
  {
    path: '/game',
    name: 'GameHome',
    component: () => import('../views/GameHomeView.vue'),
    meta: {
      title: '游戏 - 永乐大典',
    },
  },
  {
    path: '/roomlist',
    name: 'RoomList',
    component: () => import('../views/RoomListView.vue'),
    meta: {
      title: '房间列表 - 永乐大典',
    },
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('../views/RoomView.vue'),
    meta: {
      title: '房间 - 永乐大典',
    },
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/MessageView.vue'),
    meta: {
      title: '站内消息 - 永乐大典',
    },
  },
  {
    path: '/message/:id',
    name: 'MessageDetail',
    component: () => import('../views/MessageDetailView.vue'),
    meta: {
      title: '站内消息 - 永乐大典',
    },
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('../views/AnnouncementView.vue'),
    meta: {
      title: '公告 - 永乐大典',
    },
  },
  {
    path: '/wiki',
    name: 'Wiki',
    component: () => import('../views/WikiView.vue'),
    meta: {
      title: '大典Wiki - 永乐大典',
    },
  },
  {
    path: '/wiki/online',
    name: 'OnlineWiki',
    component: () => import('../views/OnlineWikiView.vue'),
    meta: {
      title: '在线大典 - 永乐大典',
    },
  },
  {
    path: '/wiki/docx',
    name: 'DocxWiki',
    component: () => import('../views/DocxWikiView.vue'),
    meta: {
      title: '大典Docx - 永乐大典',
    },
  },
  {
    path: '/wiki/test',
    name: 'Test',
    component: () => import('../views/TestView.vue'),
    meta: {
      title: '在线试验 - 永乐大典',
    },
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import('../views/MyAccountView.vue'),
    meta: {
      title: '我的账号 - 永乐大典',
    },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryView.vue'),
    meta: {
      title: '历史对局 - 永乐大典',
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/SettingView.vue'),
    meta: {
      title: '设置 - 永乐大典',
    },
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: () => import('../views/ChangelogView.vue'),
    meta: {
      title: '更新日志 - 永乐大典',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于 - 永乐大典',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: '登录 - 永乐大典',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: '注册新账号 - 永乐大典',
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/LogoutView.vue'),
    meta: {
      title: '登出 - 永乐大典',
    },
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: () => import('../views/ResetPasswordView.vue'),
    meta: {
      title: '重置密码 - 永乐大典',
    },
  },
  {
    path: '/emailverify',
    name: 'EmailVerify',
    component: () => import('../views/EmailVerifyView.vue'),
    meta: {
      title: '邮箱验证 - 永乐大典',
    },
  },
  // {
  //   path: '/',
  //   name: '',
  //   component: () => import('../views/View.vue'),
  //   meta: {
  //     title: '',
  //   },
  // },
]

export default routes
