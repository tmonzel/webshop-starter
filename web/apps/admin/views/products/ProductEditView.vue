<template>
  <div>
    <div class="d-flex mb-4">
      <RouterLink
        class="btn btn-lg btn-light me-2" 
        to="/products"
      ><i class="bi bi-arrow-left me-1"></i></RouterLink>
      <button 
        class="btn btn-lg btn-primary me-2" 
        @click="form?.submit" 
        :disabled="state.loadingState === 'saving'"
      ><i class="bi bi-save me-1"></i> Speichern</button>
      <!--<button 
        class="btn btn-lg btn-danger" 
      ><i class="bi bi-trash me-1"></i> Löschen</button>-->
    </div>

    <h1 class="fw-bold mb-5">Produkt bearbeiten</h1>

    <div style="max-width: 800px;">
      <ProductForm 
        ref="form" 
        v-if="state.loadedItem" 
        :product="state.loadedItem" 
        @save="onProductSaved"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ProductForm } from '@admin/features/product';
import { useProducts, ProductModel } from '@/composables/product';
import { router } from '@admin/routing';

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

    const onProductSaved = () => {
      router.push('/products');
    }

    return {
      form,
      state,
      onProductSaved
    }
  }
});
</script>

<style lang="scss">

</style>
