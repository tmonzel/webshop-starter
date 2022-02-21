<template>
  <form ref="form" :class="{ 'was-validated': state.wasValidated }">
    <div class="mb-3">
        <FormControl 
          label="Name" 
          :validate="['required']"
          :errors="{ required: 'Bitte gib einen Namen ein.' }"
          v-model="state.data.name" 
        />
      </div>
      <div class="mb-3">
        <FormControl 
          label="Typ" 
          :validate="['required']"
          :errors="{ required: 'Bitte gib sie einen Typ ein.' }"
          v-model="state.data.type" 
        />
      </div>
      <div class="mb-3">
        <label for="productDescriptionControl" class="form-label">Beschreibung</label>
        <textarea id="productDescriptionControl" class="form-control" v-model="state.data.description" rows="8"></textarea>
      </div>
      <div class="mb-3">
        <FormControl 
          label="Bild" 
          v-model="state.data.imageUrl" 
        />
      </div>

      <div class="mb-3">
        <FormControl 
          label="Preis" 
          type="text"
          v-model="state.data.price.value" 
        />
      </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import { FormControl } from '@/forms/components';
import { useProducts } from '@/composables/product';
import { Product } from '@/core';

export default defineComponent({
  name: 'ProductForm',
  components: {
    FormControl
  },

  props: {
    product: {} as PropType<Product>
  },

  emits: ['save'],

  methods: {
    async submit() {
      if (!this.form?.checkValidity()) {
          // Show errors
          this.state.wasValidated = true;
          return;
      }

      const product = await this.saveItem({ ...this.state.data } as Partial<Product>);

      this.$emit('save', product);
    }
  },

  setup(props) {
    const data = props.product ?? {
        name: '',
        type: '',
        price: { value: 0, currency: 'EUR' },
        description: '',
        imageUrl: ''
    } as Product;
      
    const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
    const state = reactive({
      errors: null,
      wasValidated: false,
      data
    });

    const { saveItem } = useProducts();

    return {
        form,
        state,
        saveItem,
    }
  }
});
</script>

<style lang="scss">

</style>
