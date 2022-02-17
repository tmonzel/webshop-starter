<template>
    <div class="container mt-5">

      <h1 class="fw-bold" v-if="state.searchText !== ''">Suche nach <mark>„{{ state.searchText }}“</mark></h1>
      <h1 class="display-4 fw-bold" style="line-height: 1;" v-else>Das<br>Sortiment</h1>

      <div class="d-flex justify-content-end mb-1">
        <input type="text" v-model="state.searchText" class="form-control form-control-lg" style="max-width: 320px;" placeholder="Suche&hellip;" />
      </div>
      <hr class="my-5">

      <div v-if="filteredItems.length > 0" class="row">
        <div class="col-md-3" v-for="product in filteredItems" :key="product._id">
            <div class="card shadow-sm" @click="navigateToProduct(product)">
              <div class="card-body">
                <h6 class="text-muted text-uppercase m-0">{{ product.type }}</h6>
                <h3 class="cart-title">{{ product.name }}</h3>
                <div>
                  <img :src="product.imageUrl" class="w-100">
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="alert alert-info" v-else>
        Keine Artikel zu „{{ state.searchText }}“ gefunden
      </div>
    </div>
</template>

<script lang="ts">
import { useProducts } from '@/composables';
import { Product } from '@/core';
import { router } from '@shop/routing';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductListView',

  setup() {
    const products = useProducts();

    products.loadAll();

    const navigateToProduct = (product: Product) => {
      router.push('/products/' + product._id);
    };

    return {
      state: products.state,
      filteredItems: products.filteredItems,
      navigateToProduct
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;

  &-body {
    min-height: 200px;
  }
}
</style>