<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1 class="fw-bold mb-5">Produkt bearbeiten</h1>
      <div>
        <button 
          class="btn btn-lg btn-success" 
          @click="form?.submit" 
          :disabled="state.loadingState === 'saving'"
        ><i class="bi bi-save me-1"></i> Speichern</button>
      </div>
    </div>
    <div style="max-width: 800px;">
      <ProductForm ref="form" v-if="state.loadedItem" :product="state.loadedItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ProductForm } from '@admin/features/product';
import { useProducts, ProductModel } from '@/composables/product';

export default defineComponent({
  name: 'ProductEditView',
  components: {
    ProductForm
  },

  beforeRouteEnter(route) {
    ProductModel.loadOneIfNecessary(route.params.id as string);
  },

  setup() {
    const form = ref<InstanceType<typeof ProductForm> | null>(null);
    const { state } = useProducts();

    return {
      form,
      state,
    }
  }
});
</script>

<style lang="scss">

</style>
