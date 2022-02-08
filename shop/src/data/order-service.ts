import { ResourceService, Order } from '@/core';

export const orderService = new class extends ResourceService<Order> {
    constructor() {
        super('/orders');
    }
}
