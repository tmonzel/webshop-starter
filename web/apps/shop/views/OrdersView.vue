<template>
  <div class="container mt-5">
    <h1>Bestellungen</h1>
    <p class="lead">Alle Ihre Bestellungen auf einen Blick</p>
    <ul class="list-group">
      <li v-for="order in state.items" :key="order._id" class="list-group-item">{{ order }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useOrders } from '@shop/features/order';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrdersView',

  setup() {
    const orders = useOrders();

    orders.loadAll();

    return {
      state: orders.state,
    }
  }
});
</script>

<style>

</style>
