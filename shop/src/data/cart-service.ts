import { OrderItem } from '@/core';

const cartKey = '_CART_ITEMS';

export const cartService = {
    readItems() {
        const cartItems = localStorage.getItem(cartKey);

        if(cartItems) {
            return JSON.parse(cartItems);
        }

        return [];
    },

    writeItems(items: OrderItem[]) {
        localStorage.setItem(cartKey, JSON.stringify(items));
    },

    addItem(item) {

    },

    removeItem(id: string) {

    }
}