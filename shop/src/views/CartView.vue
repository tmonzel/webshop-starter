<template>
  <div class="container mt-5">
    <h1 class="mb-5">Ihr Warenkorb</h1>
    <div class="row">
      <div class="col-md-9">
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
      <div class="col-md-3 bg-light p-4">
        <div class="d-flex justify-content-end" v-if="auth.user">
          <button class="btn btn-lg btn-primary" @click="orderCart">Bestellen</button>
        </div>

        <div class="alert alert-info" v-else>
          Bitte einloggen um zu bestellen.
        </div>
      </div>
    </div>

    
  </div>
</template>

<script lang="ts">
import { useAuth } from '@/features/auth';
import { useCart } from '@/features/cart';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CartView',

  setup() {
    const { state: cart, removeItem, orderCart } = useCart();
    const { state: auth } = useAuth();

    return {
      cart,
      auth,
      orderCart,
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