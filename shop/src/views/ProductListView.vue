<template>
    <div class="container">
      <ProductList :products="state.items" />
    </div>
</template>

<script lang="ts">
import { useProducts } from '@/composables';
import { defineComponent } from 'vue';
import ProductList from '../components/ProductList.vue';

export default defineComponent({
  name: 'ProductListView',
  components: {
    ProductList
  },

  setup() {
    const products = useProducts();

    products.loadAll();

    return {
      state: products.state
    }
  }
});
</script>