<template>
  <div>
    <h1 class="fw-bold mb-4">Produkte</h1>
    <table class="table">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Typ</th>
            <th scope="col">Bild</th>
            <th scope="col">Preis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in state.items" :key="p._id">
            <th scope="row">{{ p._id }}</th>
            <td>{{ p.name }}</td>
            <td>{{ p.type }}</td>
            <td>{{ p.imageUrl }}</td>
            <td>{{ p.price.value }} {{ p.price.currency }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useProducts } from '@/composables/product';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductsView',

  setup() {
    const { state, loadAllIfNecessary } = useProducts();
    
    loadAllIfNecessary();

    return {
      state
    }
  }
});
</script>

<style lang="scss">

</style>
