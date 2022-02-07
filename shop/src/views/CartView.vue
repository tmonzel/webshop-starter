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
            <div>
              <span class="me-3">{{ item.product.price.value }} {{ item.product.price.currency }}</span>
              <span>
                <button class="btn p-0 shadow-none" @click="removeItem(index)">
                  <i class="bi-trash"></i>
                </button>
              </span>
            </div>
          </li>
        </ul>
        <div v-else class="alert alert-info">
          Der Warenkorb ist leer.
        </div>
      </div>
      <div class="col-md-3">
        <div class="bg-light p-4 mb-3">
          <div class="fs-4 text-end mb-3">
            <span class="lead">Gesamt</span><br>{{ priceTotal.value }} {{ priceTotal.currency }}
          </div>
        </div>

        <div class="d-flex justify-content-end" v-if="auth.user">
          <button class="btn btn-lg btn-primary" @click="orderCart">Bestellen</button>
        </div>

        <div class="alert alert-warning" v-else>
          Bitte <router-link to="/login">einloggen</router-link> um zu bestellen.
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
    const { state: cart, removeItem, orderCart, priceTotal } = useCart();
    const { state: auth } = useAuth();

    return {
      cart,
      auth,
      orderCart,
      removeItem,
      priceTotal
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