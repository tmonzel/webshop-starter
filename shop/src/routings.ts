import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
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
            path: '/',
            name: 'Dashboard',
            component: () => import('./views/DashboardView.vue')
        },
    ]
});

export { router } 