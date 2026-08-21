import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
import { Analytics } from "@vercel/analytics/vue"
Analytics()

app.use(createPinia())
app.use(router)

app.mount('#app')
