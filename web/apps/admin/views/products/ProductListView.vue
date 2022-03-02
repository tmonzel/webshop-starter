<template>
  <div>
    <div class="mb-4">
      <RouterLink class="btn btn-lg btn-primary" to="/products/new">Neu anlegen <i class="bi bi-plus-square ms-1"></i></RouterLink>
    </div>
    <h1 class="fw-bold mb-4">Produkte</h1>
    <table class="table table-hover">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Typ</th>
            <th scope="col">Bild</th>
            <th scope="col">Preis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in state.items" :key="product._id" @click="navigateToProduct(product)">
            <th scope="row">{{ product._id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.type }}</td>
            <td><img :src="product.image" style="max-width: 140px;"></td>
            <td>{{ product.price.value }} {{ product.price.currency }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useProducts } from '@/composables/product';
import { Product } from '@/core';
import { router } from '@admin/routing';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductsView',

  setup() {
    const { state, loadAllIfNecessary } = useProducts();
    
    loadAllIfNecessary();

    const navigateToProduct = (product: Product) => {
      router.push('/products/' + product._id + '/edit');
    }

    return {
      state,
      navigateToProduct
    }
  }
});
</script>

<style lang="scss" scoped>
tr {
  cursor: pointer;
}
</style>
