<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-end mb-1">
        <input type="text" v-model="state.searchText" class="form-control form-control-lg" style="max-width: 320px;" placeholder="Suche&hellip;" />
      </div>

      <h1 v-if="state.searchText !== ''">Suche nach „{{ state.searchText }}“</h1>
      <h1 v-else>Alle Artikel</h1>

      <hr class="my-5">

      <ProductList v-if="filteredItems.length > 0" :products="filteredItems" />

      <div class="alert alert-info" v-else>
        Keine Artikel zu „{{ state.searchText }}“ gefunden
      </div>
    </div>
</template>

<script lang="ts">
import { useProducts } from '@/composables';
import { defineComponent } from 'vue';
import { ProductList } from '../components';

export default defineComponent({
  name: 'ProductListView',
  components: {
    ProductList
  },

  setup() {
    const products = useProducts();

    products.loadAll();

    return {
      state: products.state,
      filteredItems: products.filteredItems
    }
  }
});
</script>