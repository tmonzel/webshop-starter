import { User } from '@/core';
import { userService } from '@/data';
import { reactive } from 'vue';

interface UserState {
    items: User[];
    loadedItem: User | null;
} 

const INIT_STATE: UserState = {
    items: [],
    loadedItem: null,
}

export const useUsers = (initialState: UserState = INIT_STATE) => {
    const state = reactive(initialState);

    const loadAll = () => {
        userService.find().subscribe(products => {
            state.items = products;
        });
    }

    const loadOne = (id: string) => {
        userService.findOne(id).subscribe(product => {
            state.loadedItem = product;
        });
    }

    return {
        state,
        loadAll,
        loadOne,
    }
}