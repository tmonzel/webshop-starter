<template>
  <div>
    <h1>{{ state.loadedItem?.lastName }}, {{ state.loadedItem?.firstName }}</h1>
    
  </div>
</template>

<script lang="ts">
import { useCustomers } from '@/composables/customer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomerDetailView',

  mounted() {
    this.loadOneIfNecessary(this.$route.params.id as string);
  },

  unmounted() {
    this.unloadItem();
  },

  setup() {
    const { state, loadOneIfNecessary, unloadItem } = useCustomers();

    return {
      state,
      loadOneIfNecessary,
      unloadItem
    }
  }
});
</script>

<style lang="scss">

</style>
