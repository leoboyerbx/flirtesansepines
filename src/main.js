import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.config.devtool = true
app.use(store).mount('#app')
