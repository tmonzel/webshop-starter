import { reactive } from 'vue';
import { api, Product } from './core';

interface ProductState {
    items: Product[];
    selectedItem: Product | null;
} 

const initialState: ProductState = {
    items: [],
    selectedItem: null
}

export const useProducts = () => {
    const state = reactive(initialState);

    const loadAll = () => {
        api.get('/products').subscribe(data => {
            state.items = data as Product[];
        });
    }

    const loadOne = (id: string) => {
        api.get('/products/' + id).subscribe(data => {
            console.log(data);
            
            state.selectedItem = data as Product;
        });
    }

    return {
        state,
        loadAll,
        loadOne
    }
}