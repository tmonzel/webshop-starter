<template>
  <div class="container mt-5">
    <h1>{{ product?.name }}</h1>
    <p class="lead">{{ product?.type }}</p>
  </div>
</template>

<script lang="ts">
import { Product } from '@/core';
import { productService } from '@/data';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProductDetailView',
  props: ['id'],

  setup(props) {
    const product = ref<Product>();

    productService.findOne(props.id).subscribe(p =>{
      product.value = p;
    });

    return {
      product,
    }
  }
});
</script>