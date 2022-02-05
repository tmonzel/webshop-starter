import { OrderItem } from '@/core';
import { reactive } from 'vue'

const CART_STORAGE_KEY = '_CART';

export interface CartState {
    items: OrderItem[]
}

const initialState: CartState = {
    items: []
}

const cartStorage = localStorage.getItem(CART_STORAGE_KEY);
const cartState = reactive<CartState>(cartStorage ? JSON.parse(cartStorage) : initialState);

const syncStorage = () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
}

export const useCart = () => {
    const addItem = (item: OrderItem) => {
        cartState.items.push(item);
        syncStorage();
    }

    const removeItem = (id: string) => {
        cartState.items = cartState.items.filter(item => item._id !== id);
        syncStorage();
    }

    return {
        state: cartState,
        addItem,
        removeItem
    }
}