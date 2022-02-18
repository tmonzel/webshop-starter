import { Order } from '@/core';
import { orderService } from '@/data';
import { createReactiveModel } from '@/state';

export const OrderModel = createReactiveModel<Order>(orderService);

export const useOrders = () => {
    return {
        ...OrderModel
    }
}
