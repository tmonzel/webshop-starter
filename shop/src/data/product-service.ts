import { ResourceService, Product } from '@/core';

export const productService = new class extends ResourceService<Product> {
    constructor() {
        super('/products');
    }
}
