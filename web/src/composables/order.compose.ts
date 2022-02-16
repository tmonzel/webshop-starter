import { Order } from '@/core';
import { orderService } from '@/data';
import { reactive } from 'vue';

export interface OrderState {
    items: Order[];
}

const INIT_STATE: OrderState = {
    items: [],
}

export const useOrders = (initialState: OrderState = INIT_STATE) => {
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