import { computed, reactive } from 'vue';
import { Product } from '@/core';
import { productService } from '@/data';

interface ProductState {
    items: Product[];
    loadedItem: Product | null;
    searchText: string;
} 

const initialState: ProductState = {
    items: [],
    loadedItem: null,
    searchText: ''
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

    const filteredItems = computed(() => {
        return state.items.filter(item => state.searchText !== '' ? item.name.toLowerCase().indexOf(state.searchText.toLowerCase()) !== -1 : true);
    })

    return {
        state,
        loadAll,
        loadOne,
        filteredItems
    }
}