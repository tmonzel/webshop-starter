import { Customer } from '@/core';
import { customerService, userService } from '@/data';
import { reactive } from 'vue';

interface CustomerState {
    items: Customer[];
    loadedItem: Customer | null;
} 

const INIT_STATE: CustomerState = {
    items: [],
    loadedItem: null,
}

export const useCustomers = (initialState: CustomerState = INIT_STATE) => {
    const state = reactive(initialState);

    const loadAll = () => {
        customerService.find().subscribe(products => {
            state.items = products;
        });
    }

    const loadOne = (id: string) => {
        customerService.findOne(id).subscribe(product => {
            state.loadedItem = product;
        });
    }

    return {
        state,
        loadAll,
        loadOne,
    }
}