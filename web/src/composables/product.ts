import { Product } from '@/core';
import { ProductResource } from '@/resources';
import { createReactiveModel } from '@/state';
import { computed, ref } from 'vue';

export const ProductModel = createReactiveModel<Product>(ProductResource);

export const useProducts = () => {
    const modelState = ProductModel.state;
    const searchText = ref('');

    const filteredItems = computed(() => {
        const term = searchText.value.toLowerCase();

        return modelState.items.filter(item => {
            return searchText.value !== '' ? item.name.toLowerCase().indexOf(term) !== -1 : true;
        });
    });

    return {
        searchText,
        filteredItems,
        ...ProductModel
    }
}
