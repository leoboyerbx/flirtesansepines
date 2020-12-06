import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import variables from "@/variables";

const app = createApp(App)
app.config.globalProperties.$globals = variables
app.use(store).mount('#app')
