import { createRouter, createWebHistory } from 'vue-router'
import Vehicle from '../views/Vehicle.vue'
import Login from '../views/Login.vue'

// createWebHistory(import.meta.env.BASE_URL),
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name:  'login',
            component: Login
        },
        {
            path: '/vehicle',
            name:  'vehicle',
            component: Vehicle
        }
    ]
})

export default router