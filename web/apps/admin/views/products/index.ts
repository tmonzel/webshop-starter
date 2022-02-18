export const productRoutes = {
    path: '/products',
    name: 'ProductLayout',
    component: () => import('./ProductLayout.vue'),
    children: [
        {
            path: ':id/edit',
            name: 'ProductEdit',
            component: () => import('./ProductEditView.vue'),
        },

        {
            path: ':id',
            name: 'ProductDetail',
            component: () => import('./ProductDetailView.vue'),
        },
        
        {
            path: '',
            name: 'ProductList',
            component: () => import('./ProductListView.vue'),
        },
    ],
}
