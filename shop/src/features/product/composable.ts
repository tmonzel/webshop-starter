import { reactive } from 'vue';
import { Product } from '@/core';
import { productService } from '@/data';

interface ProductState {
    items: Product[];
    loadedItem: Product | null;
} 

const initialState: ProductState = {
    items: [],
    loadedItem: null
}

export const useProducts = () => {
    const state = reactive(initialState);

    const loadAll = () => {
        productService.find().subscribe(products => {
            state.items = products;
        });
    }

    const loadOne = (id: string) => {
        productService.findOne(id).subscribe(product => {
            state.loadedItem = product;
        });
    }

    return {
        state,
        loadAll,
        loadOne
    }
}