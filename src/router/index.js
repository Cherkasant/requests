import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
        meta: {
            layout: 'main',
            auth: true
        }
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('../views/Help.vue'),
        meta: {
            layout: 'main',
            auth: true
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: false
        }
    },
    {
        path: '/request/:id',
        name: 'Request',
        component: () => import('../views/Request.vue'),
        meta: {
            layout: 'main',
            auth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const requiredAuth = to.meta.auth
    if (requiredAuth && store.getters['auth/isAuthenticated']) {
        next()
    } else if (requiredAuth && !store.getters['auth/isAuthenticated']) {
        next('/auth?message=auth')
    } else {
        next()
    }
})

export default router
