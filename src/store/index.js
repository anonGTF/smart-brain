import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import user from './user'
import notification from './notification'
import process from './process'

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {}
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    modules: {
        user,
        notification,
        process
    }
})