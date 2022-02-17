<template>
  <div class="container py-5">
    <h1>Bestellungen</h1>
    <p class="lead">Alle Ihre Bestellungen auf einen Blick</p>
    <ul class="list-group">
      <li v-for="order in state.items" :key="order._id" class="list-group-item">{{ order }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useOrders } from '@/composables';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrdersView',

  setup() {
    const { state, loadAll } = useOrders();

    loadAll();

    return {
      state
    }
  }
});
</script>

<style>

</style>
