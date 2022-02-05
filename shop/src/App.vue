<template>
  <Navbar />
  <main>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Navbar } from './components';

export default defineComponent({
  name: 'ShopApp',
  components: {
    Navbar
  }
});
</script>

<style>

</style>
