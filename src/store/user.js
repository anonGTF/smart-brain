import { URL_API } from "../constants"
import { postData } from '../utils'

function state() {
    return {
        userID: null,
        userName: null,
        userEmail: null,
        userCurrent: null,
        loggedIn: false
    }
}

const mutations = {
    setUserData(state, { userID, userName, userEmail, userCurrent }) {
        state.userID = userID
        state.userName = userName
        state.userEmail = userEmail
        state.userCurrent = userCurrent
        state.loggedIn = true
    },
    resetUserData(state) {
        state.userID = null
        state.userName = null
        state.userEmail = null
        state.userCurrent = null
        state.loggedIn = false
    },
    addCurrent(state, userCurrent) {
        state.userCurrent = userCurrent;
    }
}

const getters = {
    getUserData(state) {
        return {
            userID: state.userID,
            userName: state.userName,
            userEmail: state.userEmail,
            userCurrent: state.userCurrent
        }
    },
    isLoggedIn(state) {
        return state.loggedIn
    }
}

const actions = {
    async login({ commit, dispatch }, { userEmail, password }) {
        dispatch('process/showProcess', null, { root: true })
        try {
            const url = `${URL_API}/signin`

            const respon = await postData(url, {
                email: userEmail,
                password: password
            })

            if (respon) {
                commit('setUserData', {
                    userID: respon.id,
                    userName: respon.name,
                    userEmail: respon.email,
                    userCurrent: respon.entries
                })
                const successData = {
                    isShow: true,
                    message: 'Berhasil Masuk',
                    isError: false
                }
                await dispatch('notification/showNotification', successData, { root: true })
            } else {
                throw new Error(respon.message)
            }
        } catch (error) {
            const errorData = {
                isShow: true,
                message: error.message,
                isError: true
            }
            dispatch('notification/showNotification', errorData, { root: true })
            console.log(error)
        } finally {
            dispatch('process/removeProcess', null, { root: true })
        }
    },
    async register({ commit, dispatch }, { userName, userEmail, password }) {
        dispatch('process/showProcess', null, { root: true })
        try {
            const url = `${URL_API}/register`

            const respon = await postData(url, {
                name: userName,
                email: userEmail,
                password
            })
            console.log(respon);
            if (respon) {
                commit('setUserData', {
                    userID: respon.id,
                    userName: respon.name,
                    userEmail: respon.email,
                    userCurrent: respon.entries
                })
                const successData = {
                    isShow: true,
                    message: 'Berhasil Daftar',
                    isError: false
                }
                await dispatch('notification/showNotification', successData, { root: true })
            } else {
                throw new Error(respon.message)
            }
        } catch (error) {
            const errorData = {
                isShow: true,
                message: error.message,
                isError: true
            }
            dispatch('notification/showNotification', errorData, { root: true })
            console.log(error)
        } finally {
            dispatch('process/removeProcess', null, { root: true })
        }
    },
    logout({ commit, dispatch }) {
        commit('resetUserData')
        sessionStorage.clear();
        const successData = {
            isShow: true,
            message: 'Berhasil Keluar',
            isError: false
        }
        dispatch('notification/showNotification', successData, { root: true })
    },
    updateCurrent({ commit }, { userCurrent }) {
        commit('addCurrent', userCurrent);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}