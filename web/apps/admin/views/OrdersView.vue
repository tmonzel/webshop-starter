<template>
  <div>
    <h1>Bestellungen</h1>
    <table class="table">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kunde</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in state.items" :key="p._id">
            <th scope="row">{{ p._id }}</th>
            <td>{{ p.user?.username }}</td>
          </tr>
        </tbody>
    </table>
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

<style lang="scss">

</style>
