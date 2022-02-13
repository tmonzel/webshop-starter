import { api, OrderItem } from '@/core';
import { store } from '@/state';
import { auth } from '../auth';
import { computed, reactive, watch } from 'vue';

const CART_STORAGE_KEY = '_CART';

export enum CartActions {
    ADD_ITEM = 'CART_ADD_ITEM',
    ORDER_SUCCESS = 'CART_ORDER_SUCCESS'
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

    const addItem = (item: OrderItem) => {
        cartState.items.push(item);
        store.dispatch({ type: CartActions.ADD_ITEM });
    }

    const removeItem = (index: number) => {
        cartState.items.splice(index, 1);
    }

    const orderCart = () => {
        if(auth.state.user) {
            const items = cartState.items.map(item => {
                return {
                    product: item.product._id,
                    config: {}
                }
            })

            api.post('/cart', { user: auth.state.user._id, items }).subscribe({
                next() {
                    cartState.items = [];
                    store.dispatch({ type: CartActions.ORDER_SUCCESS });
                },

                error() {

                }
            });
        }
    }

    watch(() => [...cartState.items], (items) => {
        syncStorage();
    }, { deep: true })

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