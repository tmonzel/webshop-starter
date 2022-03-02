<template>
    <section class="container py-5">
      <header class="d-flex justify-content-between">
        <div>
          <h1 v-if="searchText !== ''">
            Suche nach <mark>„{{ searchText }}“</mark>
          </h1>
          <h1 v-else>Das<br>Sortiment</h1>
        </div>

        <div>
          <input type="text" v-model="searchText" class="form-control form-control-lg" style="max-width: 320px;" placeholder="Suche&hellip;" />
        </div>
      </header>

      <hr class="my-5">

      <div v-if="filteredItems.length > 0" class="row">
        <div class="col-md-3" v-for="product in filteredItems" :key="product._id">
            <div class="card shadow-sm" @click="navigateToProduct(product)">
              <div class="card-body">
                <h6 class="text-muted text-uppercase m-0">{{ product.type }}</h6>
                <h3 class="cart-title">{{ product.name }}</h3>
                <div>
                  <img :src="product.image" class="w-100">
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="alert alert-info" v-else>
        Keine Artikel zu „{{ searchText }}“ gefunden
      </div>
    </section>
</template>

<script lang="ts">
import { Product } from '@/core';
import { router } from '@shop/routing';
import { defineComponent } from 'vue';
import { useProducts } from '@/composables/product';

export default defineComponent({
  name: 'ProductListView',

  setup() {
    const { searchText, loadAllIfNecessary, filteredItems } = useProducts();

    loadAllIfNecessary();

    const navigateToProduct = (product: Product) => {
      router.push('/products/' + product._id);
    };

    return {
      searchText,
      filteredItems,
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