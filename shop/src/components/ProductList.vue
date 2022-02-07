<template>
  <div class="row">
    <div class="col-md-3" v-for="product in products" :key="product._id">
        <div class="card shadow-sm" @click="navigateToProduct(product._id)">
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '@/core';
import { router } from '@/routings';

export default defineComponent({
  name: 'ProductList',
  props: {
    products: {} as PropType<Product[]>,
  },

  setup() {
    const navigateToProduct = (id: string) => {
      router.push('/products/' + id);
    };

    return {
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
