function state() {
    return {
        isShowProcess: false
    }
}

const mutations = {
    setShowProcess(state, { isShowProcess }) {
        state.isShowProcess = isShowProcess
    }
}

const getters = {
    isProcessing(state) {
        return state.isShowProcess;
    }
}

const actions = {
    showProcess({ commit }) {
        commit('setShowProcess', {
            isShowProcess: true
        })
    },
    removeProcess({ commit }) {
        commit('setShowProcess', {
            isShowProcess: false
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}