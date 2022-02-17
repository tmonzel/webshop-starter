import { createRouter, createWebHistory } from 'vue-router';
import { auth } from './auth';

const authGuard = () => {
    // Redirect to login page if user not allowed
    if(!auth.isAllowed()) {
        return { path: '/login' }
    }

    return true;
}

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
            component: () => import('./views/LoginView.vue'),
            beforeEnter: () => {
                // Redirect to landing page if user logged in
                if(auth.isLoggedIn()) {
                    return { path: '/' }
                }

                return true;
            }
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
            component: () => import('./views/OrdersView.vue'),
            beforeEnter: [authGuard]
        },

        {
            path: '/',
            name: 'Dashboard',
            component: () => import('./views/DashboardView.vue')
        },
    ]
});

export { router } 