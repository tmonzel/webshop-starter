import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [

        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/LoginView.vue')
        },

        {
            path: '/',
            name: 'Dashboard',
            component: () => import('./views/DashboardView.vue')
        },
    ]
});
