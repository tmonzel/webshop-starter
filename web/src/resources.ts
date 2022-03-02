import { createResource, Customer, Order, Product, User } from './core';

export const CustomerResource = createResource<Customer>(
    '/customers'
);

export const OrderResource = createResource<Order>(
    '/orders'
);

export const ProductResource = createResource<Product>(
    '/products',
    {
        serialize(product: Product): any {
            return product;
        },

        deserialize(data: any): Product {
            return { 
                ...data, 
                image: data.image ? Buffer.from(data.image.data, 'binary').toString('utf8') : null
            };
        }
    }
);

export const UserResource = createResource<User>(
    '/users'
);
