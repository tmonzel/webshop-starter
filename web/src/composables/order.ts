import { Order } from '@/core';
import { OrderResource } from '@/resources';
import { createReactiveModel } from '@/state';

export const OrderModel = createReactiveModel<Order>(OrderResource);

export const useOrders = () => {
    return {
        ...OrderModel
    }
}
