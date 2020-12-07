import Vue from 'vue'
import App from './App.vue'
import store from './store'
import variables from "@/variables";

// Vue.prototype.$globals = variables

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
