import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Landing',
        component: Landing
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // check if logged in
        // if not, redirect to login page.
        if (!store.state.user.loggedIn) {
            next({ name: 'Login' })
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth
    }
})

export default router