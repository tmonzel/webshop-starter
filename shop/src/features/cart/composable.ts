import { api, OrderItem } from '@/core';
import { store } from '@/state';
import { computed, reactive } from 'vue'
import { useAuth } from '../auth';

const CART_STORAGE_KEY = '_CART';

export enum CartActions {
    ADD_ITEM = 'CART_ADD_ITEM'
}

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
    const { state: authState } = useAuth();

    const addItem = (item: OrderItem) => {
        cartState.items.push(item);
        syncStorage();
        store.dispatch({ type: CartActions.ADD_ITEM });
    }

    const removeItem = (index: number) => {
        cartState.items.splice(index, 1);
        syncStorage();
    }

    const orderCart = () => {
        if(authState.user) {
            const items = cartState.items.map(item => {
                console.log(item.product);
                
                return {
                    product: item.product._id,
                    config: {}
                }
            })


            api.post('/cart', { user: authState.user._id, items }).subscribe(response => {
                console.log(response);
            });
        }
    }

    const priceTotal = computed(() => {
        return {
            currency: 'EUR',
            value: cartState.items.reduce((sum, curr) => sum + curr.quantity * curr.product.price.value, 0).toFixed(2)
        }
    });

    return {
        state: cartState,
        addItem,
        removeItem,
        orderCart,
        priceTotal
    }
}