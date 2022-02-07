<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <div class="col-md-5 bg-light d-flex justify-content-center align-items-center" style="min-height: 500px;">
        <div style="width: 350px; height: 300px">
          <img :src="product?.imageUrl" class="w-100">
        </div>
      </div>
      <div class="col-md-6">
        <h1>{{ product?.name }}</h1>
        <p class="lead">{{ product?.type }}</p>
        <p v-html="product?.description"></p>
        <p class="fs-4 mark">{{ product?.price.value }} {{ product?.price.currency }}</p>
        <div>
          <button class="btn btn-lg btn-primary" @click="addToCart">In den Warenkorb</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from '@/core';
import { productService } from '@/data';
import { useCart } from '@/features/cart';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProductDetailView',
  props: ['id'],

  setup(props) {
    const product = ref<Product>();
    const { addItem } = useCart();

    productService.findOne(props.id).subscribe(p =>{
      product.value = p;
    });

    const addToCart = () => {
      addItem({ product: product.value as Product, config: {}, _id: '' });
    }

    return {
      product,
      addToCart
    }
  }
});
</script>