<template>
  <div>
    <h1>Bestellungen</h1>
    <table class="table">
      <thead>
          <tr>
            <th scope="col" class="nostretch">#</th>
            <th scope="col">Kunde</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in state.items" :key="customer._id">
            <th scope="row">{{ customer._id }}</th>
            <td>{{ customer.lastName }}, {{ customer.firstName }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useCustomers, useOrders } from '@/composables';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomersView',

  setup() {
    const { state, loadAll } = useCustomers();

    loadAll();

    return {
      state
    }
  }
});
</script>

<style lang="scss">

</style>
