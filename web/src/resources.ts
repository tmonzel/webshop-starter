import { createResource, Customer, Media, Order, Product, User } from './core';

export const CustomerResource = createResource<Customer>(
    '/customers'
);

export const MediaResource = createResource<Media>(
    '/media'
);

export const OrderResource = createResource<Order>(
    '/orders'
);

export const ProductResource = createResource<Product>(
    '/products'
);

export const UserResource = createResource<User>(
    '/users'
);
