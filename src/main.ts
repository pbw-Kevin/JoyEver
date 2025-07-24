import './assets/main.css'

import 'mdui'
import 'mdui/mdui.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
