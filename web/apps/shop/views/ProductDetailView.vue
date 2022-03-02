<template>
  <div class="container py-5">
    <div class="row justify-content-between">
      <div class="col-md-5 bg-light d-flex justify-content-center align-items-center" style="min-height: 500px;">
        <div style="width: 350px; height: 300px">
          <img :src="item.product.image" class="w-100">
        </div>
      </div>
      <div class="col-md-6">
        <h1>{{ item.product?.name }}</h1>
        <p class="lead">{{ item.product.type }}</p>
        <p v-html="item.product?.description"></p>
        <div class="d-flex">
          <div style="max-width: 100px;">
            <input 
              type="number" 
              class="form-control form-control-lg" 
              :class="{ 'is-invalid': item.quantity < 1 }"
              placeholder="Anzahl" 
              v-model="item.quantity" 
              min="1"
            >
          </div>
          <div class="flex-grow-1 ms-3">
            <p class="fs-4 mark">{{ (item.quantity * item.product.price.value).toFixed(2) }} {{ item.product.price.currency }}</p>
          </div>
        </div>
        <div>
          <button class="btn btn-lg btn-primary" @click="addItem(item)" :disabled="item.quantity < 1">
            <i class="bi bi-cart-plus me-1"></i> In den Wagen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrderItem } from '@/core';
import { ProductResource } from '@/resources';
import { useCart } from '@shop/features/cart';
import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'ProductDetailView',
  props: ['id'],

  async setup(props) {
    const item = ref() as Ref<OrderItem>;
    const { addItem } = useCart();

    const product = await ProductResource.findOne(props.id);

    item.value = {
      product,
      quantity: 1,
      config: {}
    };

    return {
      item,
      addItem
    }
  }
});
</script>