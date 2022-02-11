<template>
  <div class="container mt-5">
    <h1 class="mb-5">Ihr Warenkorb</h1>
    <div class="row">
      <div class="col-md-9">
        <div v-if="cart.items.length > 0">

          <div class="card mb-3" v-for="(item, index) in cart.items" :key="index">
            <div class="row g-0">
              <div class="col-md-4 bg-light d-flex justify-content-center align-items-center" style="max-width: 250px;">
                <img :src="item.product.imageUrl" class="img-fluid rounded-start" style="max-height: 150px;">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ item.product.name }}</h5>
                  <p class="card-text">{{ item.product.type }}</p>
                  <p class="card-text d-flex align-items-center">
                    <input type="number" class="form-control" v-model="item.quantity" style="max-width: 80px" min="1">
                    <span class="ms-3">{{ (item.quantity * item.product.price.value).toFixed(2) }} {{ item.product.price.currency }}</span>
                  </p>

                  <button class="btn btn-lg p-0 shadow-none" @click="removeItem(index)">
                    <i class="bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <button class="btn btn-lg btn-primary" @click="orderCart" :disabled="cart.items.length === 0">Bestellen</button>
        </div>

        <div class="alert alert-warning" v-else>
          Bitte <router-link to="/login">einloggen</router-link> um zu bestellen.
        </div>
      </div>
    </div>

    
  </div>
</template>

<script lang="ts">
import { useAuth } from '@/auth/composables';
import { useCart } from '@shop/features/cart';
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

</style>