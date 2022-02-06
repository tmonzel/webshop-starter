<template>
  <div class="container mt-5">
    <h1>{{ product?.name }}</h1>
    <p class="lead">{{ product?.type }}</p>
    <div>
      <button class="btn btn-primary" @click="addToCart">In den Warenkorb</button>
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