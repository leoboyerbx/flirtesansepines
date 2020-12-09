import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hivEstimation: 0
  },
  mutations: {
    updateEstimaton (state, n) {
      state.hivEstimation = n
    }
  },
  actions: {
  },
  modules: {
  }
})
