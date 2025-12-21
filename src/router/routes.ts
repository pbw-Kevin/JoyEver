var routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      title: 'home.title',
    },
  },
  {
    path: '/game',
    name: 'GameHome',
    component: () => import('@/views/game/GameHomeView.vue'),
    meta: {
      title: 'game.title',
    },
  },
  {
    path: '/roomlist',
    name: 'RoomList',
    component: () => import('@/views/game/RoomListView.vue'),
    meta: {
      title: 'game.room.list.title',
    },
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import('@/views/game/RoomView.vue'),
    meta: {
      title: 'game.room.title',
    },
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/message/MessageView.vue'),
    meta: {
      title: 'message.title',
    },
  },
  {
    path: '/message/:id',
    name: 'MessageDetail',
    component: () => import('@/views/message/MessageDetailView.vue'),
    meta: {
      title: 'message.title',
    },
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('@/views/message/AnnouncementView.vue'),
    meta: {
      title: 'announcement.title',
    },
  },
  {
    path: '/wiki',
    name: 'Wiki',
    component: () => import('@/views/wiki/WikiView.vue'),
    meta: {
      title: 'wiki.title',
    },
  },
  {
    path: '/wiki/online',
    name: 'OnlineWiki',
    component: () => import('@/views/wiki/OnlineWikiView.vue'),
    meta: {
      title: 'wiki.online.title',
    },
  },
  {
    path: '/wiki/docx',
    name: 'DocxWiki',
    component: () => import('@/views/wiki/DocxWikiView.vue'),
    meta: {
      title: 'wiki.docx.title',
    },
  },
  {
    path: '/wiki/test',
    name: 'Test',
    component: () => import('@/views/wiki/TestView.vue'),
    meta: {
      title: 'wiki.test.title',
    },
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import('@/views/account/MyAccountView.vue'),
    meta: {
      title: 'account.my.title',
    },
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: () => import('@/views/account/AccountView.vue'),
    meta: {
      title: 'account.title',
    },
  },
  {
    path: '/history',
    name: 'MyHistory',
    component: () => import('@/views/history/MyHistoryView.vue'),
    meta: {
      title: 'game.history.my.title',
    },
  },
  {
    path: '/history/:id',
    name: 'History',
    component: () => import('@/views/history/HistoryView.vue'),
    meta: {
      title: 'game.history.title',
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/account/SettingView.vue'),
    meta: {
      title: 'setting.title',
    },
  },
  {
    path: '/ticket/new',
    name: 'NewTicket',
    component: () => import('@/views/ticket/NewTicketView.vue'),
    meta: {
      title: 'ticket.new.title',
    },
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () => import('@/views/ticket/TicketView.vue'),
    meta: {
      title: 'ticket.title',
    },
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: () => import('@/views/changelog/ChangelogView.vue'),
    meta: {
      title: 'changelog.title',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/AboutView.vue'),
    meta: {
      title: 'about.title',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: {
      title: 'admin.title',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/LoginView.vue'),
    meta: {
      title: 'account.operation.login',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/account/RegisterView.vue'),
    meta: {
      title: 'account.operation.register',
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/account/LogoutView.vue'),
    meta: {
      title: 'account.operation.logout',
    },
  },
  {
    path: '/preresetpassword',
    name: 'PreResetPassword',
    component: () => import('@/views/account/PreResetPasswordView.vue'),
    meta: {
      title: 'account.operation.resetPassword',
    },
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: () => import('@/views/account/ResetPasswordView.vue'),
    meta: {
      title: 'account.operation.resetPassword',
    },
  },
  {
    path: '/emailverify',
    name: 'EmailVerify',
    component: () => import('@/views/account/EmailVerifyView.vue'),
    meta: {
      title: 'account.operation.emailVerify',
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
