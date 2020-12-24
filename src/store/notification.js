function state() {
    return {
        isShow: false,
        isError: false,
        message: null
    }
}

const mutations = {
    setNotification(state, { isShow, isError, message }) {
        state.isShow = isShow
        state.isError = isError
        state.message = message
    },
    removeNotification(state) {
        state.isShow = false
        state.isError = false
        state.message = null
    }
}

const getters = {
    isNotifShow(state) {
        return state.isShow;
    },
    isNotifError(state) {
        return state.isError;
    },
    getNotifMessage(state) {
        return state.message;
    }
}

const actions = {
    showNotification({ commit }, { isShow, isError, message }) {
        commit('setNotification', {
            isShow,
            isError,
            message
        })
        setTimeout(() => {
            commit('removeNotification')
        }, 3000)
    },
    closeNotification({ commit }) {
        commit('removeNotification')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}