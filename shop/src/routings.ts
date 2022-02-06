import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('./views/CartView.vue')
        },

        {
            path: '/signup',
            name: 'Signup',
            component: () => import('./views/SignupView.vue')
        },

        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/LoginView.vue')
        },

        {
            path: '/products',
            name: 'ProductList',
            component: () => import('./views/ProductListView.vue')
        },

        {
            path: '/products/:id',
            name: 'ProductDetail',
            component: () => import('./views/ProductDetailView.vue'),
            props: true
        },

        {
            path: '/orders',
            name: 'Orders',
            component: () => import('./views/OrdersView.vue')
        },

        {
            path: '/',
            name: 'Dashboard',
            component: () => import('./views/DashboardView.vue')
        },
    ]
});

export { router } 