import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    role: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      state.token = data
      sessionStorage.setItem('token', data)
    },
    [types.LOGOUT]: (state) => {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    [types.ROLE]: (state, data) => {
      state.role = data
      sessionStorage.setItem('role', data)
    }
  }
})

export default store
