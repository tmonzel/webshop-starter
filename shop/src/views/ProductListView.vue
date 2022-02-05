<template>
    <div class="container mt-5">
      <h1>Our Products</h1>
      <hr class="my-5">
      <ProductList :products="state.items" />
    </div>
</template>

<script lang="ts">
import { useProducts } from '@/features/product';
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