import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@formkit/themes/genesis'

const app = createApp(App)

app.use(createPinia())
app.use(plugin, defaultConfig);
app.use(router)
app.mount('#app')
