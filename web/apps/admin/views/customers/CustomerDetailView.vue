<template>
  <div>
    <h1>Dieser Kunde</h1>
    
  </div>
</template>

<script lang="ts">
import { useCustomers } from '@/composables';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomerDetailView',

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
