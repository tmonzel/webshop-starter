/**
 * Abstract mongo document type
 */
export interface AbstractDocument {
    _id: string;
}

/**
 * Benutzer 
 */
export interface User extends AbstractDocument {
    email: string;
    username: string;
    password?: string;
}

/**
 * 
 * 
 * @endpoint /api/products
 */
export interface Product extends AbstractDocument {
    type: string;
    name: string;
    description: string;
    imageUrl: string;
    price: { 
        value: number; 
        currency: 'EUR' | 'USD' 
    };
}

/**
 * 
 * @endpoint /api/orders
 */
export interface Order extends AbstractDocument {
    state: 'ordered' | 'cart';
    items: OrderItem[];
}

/**
 * A configured product within an order
 * 
 */
export interface OrderItem extends AbstractDocument {
    product: Product;
    config: any;
}