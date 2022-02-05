import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/products',
            name: 'ProductListView',
            component: () => import('./views/ProductListView.vue')
        },

        {
            path: '/products/:id',
            name: 'ProductDetailView',
            component: () => import('./views/ProductDetailView.vue'),
            props: true
        },
    ]
});

export { router } 