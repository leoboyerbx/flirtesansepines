import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hivEstimation: 0,
    deathEstimation: false,
    condomUsage: 0
  },
  mutations: {
    updateEstimaton (state, n) {
      state.hivEstimation = n
    },
    updateDeathUserData(state, n) {
      state.deathEstimation = n
    },
    updateUserCondomUsage(state, n) {
      state.condomUsage = n
    }
  },
  actions: {
  },
  modules: {
  }
})
