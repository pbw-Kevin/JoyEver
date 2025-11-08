var routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      title: '首页 - 永乐大典',
    },
  },
  {
    path: '/game',
    name: 'GameHome',
    component: () => import('@/views/game/GameHomeView.vue'),
    meta: {
      title: '游戏 - 永乐大典',
    },
  },
  {
    path: '/roomlist',
    name: 'RoomList',
    component: () => import('@/views/game/RoomListView.vue'),
    meta: {
      title: '房间列表 - 永乐大典',
    },
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('@/views/game/RoomView.vue'),
    meta: {
      title: '房间 - 永乐大典',
    },
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/message/MessageView.vue'),
    meta: {
      title: '站内消息 - 永乐大典',
    },
  },
  {
    path: '/message/:id',
    name: 'MessageDetail',
    component: () => import('@/views/message/MessageDetailView.vue'),
    meta: {
      title: '站内消息 - 永乐大典',
    },
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('@/views/message/AnnouncementView.vue'),
    meta: {
      title: '公告 - 永乐大典',
    },
  },
  {
    path: '/wiki',
    name: 'Wiki',
    component: () => import('@/views/wiki/WikiView.vue'),
    meta: {
      title: '大典Wiki - 永乐大典',
    },
  },
  {
    path: '/wiki/online',
    name: 'OnlineWiki',
    component: () => import('@/views/wiki/OnlineWikiView.vue'),
    meta: {
      title: '在线大典 - 永乐大典',
    },
  },
  {
    path: '/wiki/docx',
    name: 'DocxWiki',
    component: () => import('@/views/wiki/DocxWikiView.vue'),
    meta: {
      title: '大典Docx - 永乐大典',
    },
  },
  {
    path: '/wiki/test',
    name: 'Test',
    component: () => import('@/views/wiki/TestView.vue'),
    meta: {
      title: '在线试验 - 永乐大典',
    },
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import('@/views/account/MyAccountView.vue'),
    meta: {
      title: '我的账号 - 永乐大典',
    },
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: () => import('@/views/account/AccountView.vue'),
    meta: {
      title: '账号 - 永乐大典',
    },
  },
  {
    path: '/history',
    name: 'MyHistory',
    component: () => import('@/views/history/MyHistoryView.vue'),
    meta: {
      title: '历史对局 - 永乐大典',
    },
  },
  {
    path: '/history/:id',
    name: 'History',
    component: () => import('@/views/history/HistoryView.vue'),
    meta: {
      title: '历史对局 - 永乐大典',
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/account/SettingView.vue'),
    meta: {
      title: '设置 - 永乐大典',
    },
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () => import('@/views/ticket/TicketView.vue'),
    meta: {
      title: '工单 - 永乐大典',
    },
  },
  {
    path: '/myticket',
    name: 'MyTicket',
    component: () => import('@/views/ticket/MyTicketView.vue'),
    meta: {
      title: '我的工单 - 永乐大典',
    },
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: () => import('@/views/changelog/ChangelogView.vue'),
    meta: {
      title: '更新日志 - 永乐大典',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/AboutView.vue'),
    meta: {
      title: '关于 - 永乐大典',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: {
      title: '管理 - 永乐大典',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/LoginView.vue'),
    meta: {
      title: '登录 - 永乐大典',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/account/RegisterView.vue'),
    meta: {
      title: '注册新账号 - 永乐大典',
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/account/LogoutView.vue'),
    meta: {
      title: '登出 - 永乐大典',
    },
  },
  {
    path: '/preresetpassword',
    name: 'PreResetPassword',
    component: () => import('@/views/account/PreResetPasswordView.vue'),
    meta: {
      title: '重置密码 - 永乐大典',
    },
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: () => import('@/views/account/ResetPasswordView.vue'),
    meta: {
      title: '重置密码 - 永乐大典',
    },
  },
  {
    path: '/emailverify',
    name: 'EmailVerify',
    component: () => import('@/views/account/EmailVerifyView.vue'),
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
