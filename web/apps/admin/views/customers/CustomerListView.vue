<template>
  <div>
    <h1 class="fw-bold mb-4">Kunden</h1>
    <table class="table table-hover">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in state.items" :key="customer._id" @click="navigateToCustomer(customer)">
            <th scope="row">{{ customer._id }}</th>
            <td>{{ customer.lastName }}, {{ customer.firstName }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useCustomers } from '@/composables';
import { Customer } from '@/core';
import { router } from '@admin/routing';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomerListView',

  setup() {
    const { state, loadAll } = useCustomers();
    const navigateToCustomer = (customer: Customer) => {
      router.push('/customers/' + customer._id);
    }

    loadAll();

    return {
      state,
      navigateToCustomer
    }
  }
});
</script>

<style lang="scss">
  tr {
    cursor: pointer;
  }
</style>
