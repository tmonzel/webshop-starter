import { Order } from '@/core';
import { orderService } from '@/data';
import { reactive } from 'vue';

export interface OrderState {
    items: Order[];
}

const initialState: OrderState = {
    items: [],
}

export const useOrders = () => {
    const state = reactive(initialState);

    const loadAll = () => {
        orderService.find().subscribe(orders => {
            state.items = orders;
        });
    }

    return {
        state,
        loadAll
    }
}