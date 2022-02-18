export const customerRoutes = {
    path: '/customers',
    name: 'CustomerLayout',
    component: () => import('./CustomerLayout.vue'),
    children: [
        {
            path: ':id',
            name: 'CustomerDetail',
            component: () => import('./CustomerDetailView.vue'),
        },

        {
            path: '',
            name: 'CustomerList',
            component: () => import('./CustomerListView.vue'),
        },
    ],
}
