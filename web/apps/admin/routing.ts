import { createRouter, createWebHistory } from 'vue-router';
import { auth } from './auth';

const authGuard = () => {
    // Redirect to login page if user not allowed
    if(!auth.isAllowed()) {
        return { path: '/login' }
    }

    return true;
}

export const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [

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
            path: '/',
            name: 'Admin',
            component: () => import('./views/AdminLayout.vue'),
            beforeEnter: [authGuard],
            children: [
                {
                    path: '/',
                    name: 'Dashboard',
                    component: () => import('./views/DashboardView.vue'),
                },

                {
                    path: '/products',
                    name: 'Products',
                    component: () => import('./views/ProductsView.vue'),
                },

                {
                    path: '/customers',
                    name: 'Customers',
                    component: () => import('./views/CustomersView.vue'),
                },

                {
                    path: '/users',
                    name: 'Users',
                    component: () => import('./views/UsersView.vue'),
                }
            ]
        },
    ]
});
