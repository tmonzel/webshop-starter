<template>
  <div class="container mt-5">
    <h1 class="mb-5">Ihr Warenkorb</h1>
    <ul v-if="cart.items.length > 0" class="list-group list-group-flush">
      <li v-for="(item, index) in cart.items" :key="index" class="list-group-item">
        <span>
          {{ item.product.name }} ({{ item.product.type }})
        </span>
        <span>
          <button class="btn p-0 shadow-none" @click="removeItem(index)">
            <i class="bi-trash"></i>
          </button>
        </span>
      </li>
    </ul>
    <div v-else class="alert alert-info">
      Der Warenkorb ist leer.
    </div>
  </div>
</template>

<script lang="ts">
import { useCart } from '@/features/cart';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CartView',

  setup() {
    const { state: cart, removeItem } = useCart();

    return {
      cart,
      removeItem
    }
  }
});
</script>

<style lang="scss" scoped>
  .list-group-item {
    align-items: center;
    justify-content: space-between;
    display: flex;
  }
</style>