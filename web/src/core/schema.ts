/**
 * Abstract mongo document type
 */
export interface AbstractDocument {
    _id?: string;
}

/**
 * Benutzer 
 */
export interface User extends AbstractDocument {
    username: string;
    password?: string;
    roles: string[];
}

/**
 * 
 * /api/v1/customers
 */
export interface Customer extends User {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
}

/**
 * 
 * 
 * @endpoint /api/v1/products
 */
export interface Product extends AbstractDocument {
    type: string;
    name: string;
    description: string;
    image: string;
    price: { 
        value: number; 
        currency: 'EUR' | 'USD' 
    };
}

/**
 * 
 * @endpoint /api/v1/orders
 */
export interface Order extends AbstractDocument {
    items: OrderItem[];
    user?: User;
}

/**
 * A configured product within an order
 * 
 */
export interface OrderItem extends AbstractDocument {
    product: Product;
    quantity: number;
    config: any;
}
